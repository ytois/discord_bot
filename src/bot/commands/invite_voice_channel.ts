import { Message } from 'discord.js'

export default (message: Message): void => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return

  // Only try to join the sender's voice channel if they are in one themselves
  if (message.member.voice.channel) {
    message.member.voice.channel.join()
  } else {
    message.reply('You need to join a voice channel first!')
  }
}
