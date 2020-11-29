import DiscordBot from './bot'
import commands from './bot/commands'
import app from './server'
import dotenv from 'dotenv'
import { createConnection } from './db'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

// connect db
createConnection()

// bot
const bot = new DiscordBot(process.env.DISCORD_BOT_TOKEN)
bot.login()
bot.registerCommands(commands)

// express
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`express listen port: ${PORT}`)
})
