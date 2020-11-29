import { Message } from 'discord.js'
import entities from '@/db/entities'
import polyglot from '@/locales'
import dayjs from 'dayjs'
import logger from '@/logger'

const INTERVAL_MIN = 5

export default async function misoshiru(message: Message): Promise<void> {
  saveOnMessage(message)

  const result = await validMessage(message)
  if (!result) {
    return
  }
  // reply message
  message.reply(polyglot.t('Bot.ng_word'))

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

// チャットのメッセージがNGワードか判定する
async function validMessage(message: Message): Promise<boolean> {
  const ngWord = await entities.NgWord.findOne({
    enable: true,
  })

  // NGワードが未登録の場合はスキップし、NGワードを作成
  if (!ngWord) {
    lotteryNgWord()
    return false
  }

  // インターバルよりも短ければスキップ
  if (dayjs().subtract(INTERVAL_MIN, 'minute').isAfter(ngWord.createdAt)) {
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

export function lotteryNgWord(message?: Message): void {
  // TODO: NGワードを抽選して登録する
  // new LotteryMachine().lottery().then((word) => {
  //   const entity = new entities.NgWord()
  //   entity.word = word
  //   entity.save()
  // })

  // 引数が与えられている場合はメッセージを返す
  if (message) {
    message.reply(polyglot.t('Bot.lottery_ng_word'))
  }
}
