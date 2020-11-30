/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash'
import kuromoji from 'kuromoji'
import entities from '@/db/entities'

export default class LotteryMachine {
  builder: kuromoji.TokenizerBuilder<kuromoji.IpadicFeatures>

  constructor() {
    this.builder = kuromoji.builder({
      dicPath: 'node_modules/kuromoji/dict',
    })
  }

  private tokenFilter(token: kuromoji.IpadicFeatures[]) {
    // 2文字以上の名詞のみを抽出
    return token
      .filter((t) => {
        return t.pos === '名詞' && t.surface_form.length >= 2
      })
      .map((t) => t.surface_form)
  }

  private async getMessages(): Promise<string[]> {
    // createdAt降順で直近500を抽出
    const RECENT_MESSAGE_NUM = 500

    return await (
      await entities.TextMessage.find({
        order: {
          createdAt: 'DESC',
        },
        take: RECENT_MESSAGE_NUM,
      })
    ).map((entity) => entity.message)
  }

  public async lottery(callback: (word: string) => void): Promise<void> {
    const THRESHOLD = 50
    const messages = await this.getMessages()

    if (messages.length < THRESHOLD) {
      throw new Error('まだメッセージが貯まっていません')
    }

    this.builder.build((_err, tokenizer) => {
      const tokenizedWord = _(messages)
        .map((message) => {
          const tokenized = tokenizer.tokenize(message)
          return this.tokenFilter(tokenized)
        })
        .flatten()

      // 出現回数順に上位30単語の中からランダムに選択
      const word = tokenizedWord
        .countBy()
        .toPairs()
        .sortBy(([_w, count], _i) => -count)
        .map(([word, _c], _i) => word)
        .slice(0, 30)
        .sample()

      if (word) {
        callback(word)
      }
    })
  }
}
