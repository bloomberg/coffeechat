import './initDotenv'
import next from 'next'
import log, { final } from './log'
import createServer from './createServer'
import Config from '../lib/Config'

const { PORT: port, NODE_ENV } = Config(process.env, {
  NODE_ENV: 'development',
  PORT: 3000,
})

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
  const server = createServer({
    nextHandler: (req, res) => handle(req, res),
  })
  server.listen(port)
  log.info({ port }, 'process started')
}

start().catch((error) => {
  log.fatal(error, 'cannot start the server')
  process.exit(1)
})
