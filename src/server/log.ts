import pino, { Logger } from 'pino'
import env from './env'

const { LOG_LEVEL: level, LOG_PRETTY: prettyPrint } = env

const log = pino({
  level,
  prettyPrint,
  ...(prettyPrint && {
    timestamp: pino.stdTimeFunctions.isoTime,
  }),
  formatters: {
    level: (label): { level: string } => ({ level: label }),
    bindings: (): Record<string, unknown> => ({}),
  },
})

export default log

export type FinalHandler = (
  error: Error,
  finalLogger: Logger,
  ...args: unknown[]
) => void

export type ExitHandler = (error: Error | null, ...args: unknown[]) => void

export const final = (finalHandler: FinalHandler): ExitHandler =>
  pino.final(log, finalHandler)
