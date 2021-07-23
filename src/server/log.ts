import pino, { Logger } from 'pino'
import { LOG_LEVEL as level, LOG_PRETTY as prettyPrint } from './environment'

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
  ...otherParameters: unknown[]
) => void

export type ExitHandler = (
  error: Error | null,
  ...otherParameters: unknown[]
) => void

export const final = (finalHandler: FinalHandler): ExitHandler =>
  pino.final(log, finalHandler)
