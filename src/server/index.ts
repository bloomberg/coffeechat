import next from 'next'
import log, { final } from './log'
import createServer from './createServer'
import { PORT as port, NODE_ENV } from './environment'

process.on(
  'SIGINT',
  final((_, finalLogger) => {
    finalLogger.info('Exiting')
    process.exit(0)
  }) as () => void
)

process.on(
  'uncaughtException',
  final((error, finalLogger) => {
    finalLogger.fatal(error, 'unhandled')
    process.exit(1)
  })
)

// the node api is Error | any
// per the docs https://nodejs.org/api/process.html#process_event_unhandledrejection
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('unhandledRejection', (reason: Error | any) => {
  log.warn(reason, 'Unhandled rejection')
})

async function start(): Promise<void> {
  log.info({ NODE_ENV }, 'application starting')
  const app = next({
    dev: NODE_ENV !== 'production',
    quiet: true,
  })
  await app.prepare()
  const handle = app.getRequestHandler()
  const server = await createServer({
    nextHandler: (request, response) => handle(request, response),
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
