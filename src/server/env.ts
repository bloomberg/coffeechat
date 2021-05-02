import { config } from 'dotenv'
import makeParser from '../lib/makeParser'

config()

interface Env {
  LOG_LEVEL: string
  LOG_PRETTY: boolean
  NODE_ENV: 'development' | 'production' | 'test'
  PORT: number
}

const parse = makeParser<Env>({
  type: 'object',
  properties: {
    LOG_LEVEL: { type: 'string', default: 'info' },
    LOG_PRETTY: { type: 'boolean', default: false },
    NODE_ENV: { type: 'string', default: 'development' },
    PORT: { type: 'number', default: 3000 },
  },
  required: [],
})

export default parse((process.env as unknown) as Env)
