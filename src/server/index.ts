import './handleProcessErrors'
import next from 'next'
import express from 'express'
import log from './log'
import { PORT as port, NODE_ENV } from './environment'
import accessLog from './express/middlewares/accessLog'

async function start(): Promise<void> {
  log.info({ NODE_ENV }, 'application starting')

  const server = express()
  server.use(accessLog)

  server.disable('x-powered-by')
  server.set('trust-proxy', true)

  const nextjsApp = next({
    dev: NODE_ENV !== 'production',
    quiet: true,
  })
  await nextjsApp.prepare()
  const nextHandler = nextjsApp.getRequestHandler()
  server.all('*', (request, response) => {
    void nextHandler(request, response)
  })

  server.listen(port)
  log.info({ port }, 'process started')
}

start().catch((error) => {
  log.fatal(error, 'cannot start the server')
  // we're catching a fatal error, so returning 1 is warranted
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1)
})
