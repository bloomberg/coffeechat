import express, { Express, RequestHandler } from 'express'
import startApolloServer from './gql/apolloServer'

interface Options {
  nextHandler: RequestHandler
}

export default async function createServer({
  nextHandler,
}: Options): Promise<Express> {
  const server = express()

  server.disable('x-powered-by')
  server.set('trust-proxy', true)

  const apolloServer = await startApolloServer()
  apolloServer.applyMiddleware({ app: server })

  server.all('*', nextHandler)

  return server
}
