import { Message } from 'discord.js'
import entities from '@/db/entities'
import polyglot from '@/locales'
import dayjs from 'dayjs'
import logger from '@/logger'
import LotteryMachine from './lottery_machine'
import NgWord from '@/db/entities/NgWord'

const INTERVAL_MIN = 5

export default async function misoshiru(message: Message): Promise<void> {
  saveOnMessage(message)

  const result = await validMessage(message)
  if (!result) {
    return
  }
  // reply message
  message.reply(polyglot.t('Bot.remark_ng_word'))

  // lottery ng word
  lotteryNgWord()
}

// チャットのメッセージをDBへ保存する
function saveOnMessage(message: Message): void {
  const entity = new entities.TextMessage()
  entity.message = message.content
  entity.save().then((e) => {
    logger.info(`TextMessage save: ${e.message}`)
  })
}

// NGワードを登録する
function saveNgWord(word: string): Promise<NgWord> {
  if (!word) {
    return
  }
  const entity = new NgWord()
  entity.word = word
  return entity.save().then((e) => {
    logger.info(`Create NG word: ${e.word}`)
    return e
  })
}

// チャットのメッセージがNGワードか判定する
async function validMessage(message: Message): Promise<boolean> {
  const ngWord = (
    await entities.NgWord.find({
      where: {
        enable: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take: 1,
    })
  )[0]

  // NGワードが未登録の場合はスキップし、NGワードを作成
  if (!ngWord) {
    lotteryNgWord()
    return false
  }

  // インターバルよりも短ければスキップ
  const createdAt = dayjs(ngWord.createdAt)
  if (dayjs().diff(createdAt, 'minute') < INTERVAL_MIN) {
    return false
  }

  // NGワードに一致した場合はtrueを返す
  if (message.content.match(ngWord.word)) {
    // NGを無効化
    ngWord.enable = false
    ngWord.save()
    return true
  }

  return false
}

// NGワードを抽選して登録する
export function lotteryNgWord(message?: Message): void {
  const callbackFunc = (word: string) => {
    saveNgWord(word).then(() => {
      // 引数が与えられている場合はメッセージを返す
      if (message) {
        message.reply(polyglot.t('Bot.lottery_ng_word'))
      }
    })
  }
  new LotteryMachine().lottery(callbackFunc)
}
