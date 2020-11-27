import { Client } from 'discord.js'

const client = new Client()

const WORDS: string[] = ['猫', '犬', '象', '人', '梟']
let ngWord = '猫'

client.on('ready', () => {
  console.log('bot is ready.')
})

client.on('message', (message) => {
  if (message.author.id === client.user.id) {
    return
  }

  if (message.content.match(/.ms[ 　]+list/)) {
    const txt = WORDS.join(' / ')
    message.reply(txt)
  } else if (message.content.match(/.ms[ 　]+ng/)) {
    message.reply(ngWord)
  } else if (message.content.match(/.ms[ 　]+reset/)) {
    ngWord = WORDS[Math.floor(Math.random() * WORDS.length)]
  } else {
    if (message.content.match(new RegExp(ngWord))) {
      message.channel.send(`@${message.author.username} は味噌汁をこぼしました`)
    }
  }
})

export default client
