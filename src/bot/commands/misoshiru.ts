import { Message } from 'discord.js'
import entities from '@/db/entities'

export default function misoshiru(message: Message): void {
  saveOnMessage(message)
}

export function saveOnMessage(message: Message): void {
  const entity = new entities.TextMessage()
  entity.message = message.content
  entity.save()
}
