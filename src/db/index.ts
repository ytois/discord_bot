import {
  getConnectionOptions,
  createConnection as createConn,
  Connection,
} from 'typeorm'

export function createConnection(): Promise<Connection> {
  return getConnectionOptions().then((option) => {
    return createConn(option)
  })
}
