import { Client, Message } from 'discord.js'
import { DiscordBot } from 'discord_bot'

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

  private onReady(): void {
    this.client.on('ready', () => {
      console.log('bot is ready.')
    })
  }

  onMessage(rule: string | RegExp, func: (message: Message) => any): void {
    this.client.on('message', (message) => {
      if (message.author.bot) {
        return
      }
      if (message.content.match(rule)) {
        return func(message)
      }
    })
  }

  registerCommands(commands: DiscordBot.Command[]): void {
    commands.forEach(({ rule, func }) => {
      this.onMessage(rule, func)
    })
  }
}

export default DiscordBot
