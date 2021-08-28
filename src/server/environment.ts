import { config } from 'dotenv'
import makeParser from '../lib/makeParser'

config()

interface Environment {
  LOG_LEVEL: string
  LOG_PRETTY: boolean
  NODE_ENV: 'development' | 'production' | 'test'
  PORT: number
  APOLLO_SERVER_PLAYGROUND_ENABLE: boolean
}

const parse = makeParser<Environment>({
  type: 'object',
  properties: {
    LOG_LEVEL: { type: 'string', default: 'info' },
    LOG_PRETTY: { type: 'boolean', default: false },
    NODE_ENV: { type: 'string', default: 'development' },
    PORT: { type: 'number', default: 3000 },
    APOLLO_SERVER_PLAYGROUND_ENABLE: { type: 'boolean', default: false },
  },
  required: [],
})

export const {
  LOG_LEVEL,
  LOG_PRETTY,
  NODE_ENV,
  PORT,
  APOLLO_SERVER_PLAYGROUND_ENABLE,
} = parse(process.env)
