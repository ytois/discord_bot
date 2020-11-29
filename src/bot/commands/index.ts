import { DiscordBot } from 'discord_bot'
import misoshiru from './misoshiru'

const commands: DiscordBot.Command[] = [
  {
    rule: /.*/,
    func: misoshiru,
  },
]

export default commands
