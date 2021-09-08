import ExpressPinoLogger from 'express-pino-logger'
import { ACCESS_LOG_ENABLE } from '../../environment'
import logger from '../../log'
import noOp from './noOp'

const pinoAccessLog = ExpressPinoLogger({
  level: 'info',
  logger,
})

export default ACCESS_LOG_ENABLE ? pinoAccessLog : noOp
