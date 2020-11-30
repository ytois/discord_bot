import { Message } from 'discord.js'
import { createQueryBuilder } from 'typeorm'
import dayjs from 'dayjs'

import entities from '@/db/entities'
import polyglot from '@/locales'
import logger from '@/logger'
import NgWord from '@/db/entities/NgWord'

import LotteryMachine from './lottery_machine'

const INTERVAL_MIN = 3

export default async function misoshiru(message: Message): Promise<void> {
  // Botコマンドの場合はスキップ
  if (message.content.match(/^\.ms/)) {
    return
  }

  saveOnMessage(message)

  const result = await validMessage(message)
  if (!result) {
    return
  }
  // reply message
  message.reply(polyglot.t('Bot.remark_ng_word'))

  // 再度NGワードを登録する
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

  // すべてのNGワードを無効化
  createQueryBuilder()
    .update(NgWord)
    .set({ enable: false })
    .where('ng_word.enable = :bool', { bool: true })
    .execute()

  const entity = new NgWord()
  entity.word = word
  return entity.save().then((e) => {
    logger.info(`Create NG word: ${e.word}`)
    return e
  })
}

// NGワードを取得
export async function getNgWord(message?: Message): Promise<NgWord> {
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

  if (message) {
    const messageType = ngWord ? 'Bot.tell_ng_word' : 'Bot.not_found_ng_word'
    message.reply(polyglot.t(messageType, { word: ngWord && ngWord.word }))
  }

  return ngWord
}

// チャットのメッセージがNGワードか判定する
async function validMessage(message: Message): Promise<boolean> {
  const ngWord = await getNgWord()

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
  new LotteryMachine().lottery(callbackFunc).catch((error) => {
    if (message) {
      message.reply(error.message)
    }
  })
}
