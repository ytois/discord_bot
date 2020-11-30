import { DiscordBot } from 'discord_bot'
import misoshiru, { lotteryNgWord, getNgWord } from './misoshiru'

const commands: DiscordBot.Command[] = [
  {
    rule: /.*/,
    func: misoshiru,
  },
  {
    // NGワードを教えてもらう
    rule: /^\.ms +tell-ng$/,
    func: getNgWord,
  },
  {
    // NGワードを作成する
    rule: /^\.ms +create-ng$/,
    func: lotteryNgWord,
  },
]

export default commands
