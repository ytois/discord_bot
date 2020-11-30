import DiscordBot from './bot'
import commands from './bot/commands'
import app from './server'
import dotenv from 'dotenv'
import { createConnection } from './db'
import logger from './logger'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

// connect db
createConnection().then(() => {
  logger.info('Create DB connection.')
})

// bot
const bot = new DiscordBot(process.env.DISCORD_BOT_TOKEN)
bot.registerCommands(commands)
bot.login()

// express
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  logger.info(`express listen port: ${PORT}`)
})
