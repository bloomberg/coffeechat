import pino from 'pino'
import { LOG_LEVEL as level, LOG_PRETTY as prettyPrint } from './environment'

const log = pino({
  level,

  ...(prettyPrint && {
    transport: {
      target: 'pino-pretty',
    },
  }),
  ...(prettyPrint && {
    timestamp: pino.stdTimeFunctions.isoTime,
  }),
  formatters: {
    level: (label): { level: string } => ({ level: label }),
    bindings: (): Record<string, unknown> => ({}),
  },
})

export default log
