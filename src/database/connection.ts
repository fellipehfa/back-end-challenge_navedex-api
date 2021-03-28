import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  const databaseName = process.env.NODE_ENV === 'test' ? 'navedex_db-test' : defaultOptions.database

  return createConnection(
    Object.assign(defaultOptions, {
      database: databaseName
    })
  )
}
