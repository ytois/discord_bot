import { Message } from 'discord.js'

export namespace DiscordBot {
  interface Command {
    rule: string | RegExp
    func: (message: Message) => any
  }
}
