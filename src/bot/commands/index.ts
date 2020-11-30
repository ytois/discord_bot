import { DiscordBot } from 'discord_bot'
import misoshiru, { lotteryNgWord } from './misoshiru'

const commands: DiscordBot.Command[] = [
  {
    rule: /.*/,
    func: misoshiru,
  },
  {
    rule: /^\.ms +create-ng/,
    func: lotteryNgWord,
  },
]

export default commands
