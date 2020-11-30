import { Client, Message } from 'discord.js'
import { DiscordBot } from 'discord_bot'
import polyglot from '@/locales'
import logger from '@/logger'

class DiscordBot {
  client: Client
  bot_token: string

  constructor(bot_token: string) {
    this.client = new Client()
    this.bot_token = bot_token

    this.onReady()
  }

  login(): Promise<string> {
    return this.client.login(this.bot_token)
  }

  registerCommands(commands: DiscordBot.Command[]): void {
    commands.forEach(({ rule, func }) => {
      this.onMessage(rule, func)
    })
  }

  private onReady(): void {
    this.client.on('ready', () => {
      logger.info(polyglot.t('Bot.ready'))
    })
  }

  private onMessage(
    rule: string | RegExp,
    func: (message: Message) => any
  ): void {
    this.client.on('message', (message) => {
      if (message.author.bot) {
        return
      }
      if (message.content.match(rule)) {
        return func(message)
      }
    })
  }
}

export default DiscordBot
