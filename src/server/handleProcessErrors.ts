import log from './log'

const signalHandler = (event: string): void => {
  log.info({ evt: event }, 'caught')
  // This will provide normal termination
  // based on pino docs: https://github.com/pinojs/pino/blob/HEAD/docs/asynchronous.md
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(0)
}

process.on('SIGQUIT', () => signalHandler('SIGQUIT'))
process.on('SIGTERM', () => signalHandler('SIGTERM'))
process.on('SIGINT', () => signalHandler('SIGINT'))
process.on('beforeExit', () => signalHandler('beforeExit'))
process.on('exit', () => signalHandler('exit'))

process.on('uncaughtException', (error) => {
  log.fatal({ err: error }, 'unhandled')
  process.exit(1)
})

// the node api is Error | any
// per the docs https://nodejs.org/api/process.html#process_event_unhandledrejection
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('unhandledRejection', (reason: Error | any) => {
  // per above comment, the signature is any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  log.warn({ err: reason }, 'Unhandled rejection')
})
