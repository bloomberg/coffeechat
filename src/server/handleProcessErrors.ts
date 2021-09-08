import log, { final } from './log'

const signalHandler = final((_, finalLogger, event_) => {
  finalLogger.info({ evt: event_ }, 'caught')
  // This will provide normal termination
  // based on pino docs: https://github.com/pinojs/pino/blob/HEAD/docs/asynchronous.md
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(0)
})

process.on('SIGQUIT', () => signalHandler(null, 'SIGQUIT'))
process.on('SIGTERM', () => signalHandler(null, 'SIGTERM'))
process.on('SIGINT', () => signalHandler(null, 'SIGINT'))
process.on('beforeExit', () => signalHandler(null, 'beforeExit'))
process.on('exit', () => signalHandler(null, 'exit'))

process.on(
  'uncaughtException',
  final((error, finalLogger) => {
    finalLogger.fatal({ err: error }, 'unhandled')
    process.exit(1)
  })
)

// the node api is Error | any
// per the docs https://nodejs.org/api/process.html#process_event_unhandledrejection
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('unhandledRejection', (reason: Error | any) => {
  // per above comment, the signature is any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  log.warn({ err: reason }, 'Unhandled rejection')
})
