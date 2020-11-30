import dayjs from 'dayjs'

export default {
  info: (text: string): void => {
    const now = dayjs().format('YYYY-MM-DDTHH:mm:ss')
    console.log(`[${now}] ${text}`)
  },
}
