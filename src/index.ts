import bot from './bot'
import app from './server'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const PORT = process.env.PORT || 3000

bot.login(process.env.DISCORD_BOT_TOKEN)

app.listen(PORT, () => {
  console.log(`express listen port: ${PORT}`)
})
