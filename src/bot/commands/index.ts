import { DiscordBot } from 'discord_bot'
import hello from './hello'
import seeYou from './see_you'
import inviteVoiceChannel from './invite_voice_channel'
import leaveVoiceChannel from './leave_voice_channel'

const commands: DiscordBot.Command[] = [
  {
    rule: /^こん(にちは)?$/,
    func: hello,
  },
  {
    rule: /^さよう?なら$/,
    func: seeYou,
  },
  {
    rule: /^.ms join$/,
    func: inviteVoiceChannel,
  },
  {
    rule: /^.ms leave$/,
    func: leaveVoiceChannel,
  },
]

export default commands
