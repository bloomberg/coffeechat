import { config } from 'dotenv'
import makeParser from '../lib/makeParser'

config()

/**
 * See sample.env for explanation of variables
 */
interface Environment {
  LOG_LEVEL: string
  LOG_PRETTY: boolean
  NODE_ENV: 'development' | 'production' | 'test'
  PORT: number
  APOLLO_SERVER_PLAYGROUND_ENABLE: boolean
  OPENID_ISSUER: string
  OPENID_CLIENT_ID: string
  OPENID_CLIENT_SECRET: string
  ACCESS_LOG_ENABLE: boolean
  GQL_SHIELD_DEBUG: boolean
  PRISMA_LOG_LEVELS: string
  NEXTAUTH_SECRET: string
}

const parse = makeParser<Environment>({
  type: 'object',
  properties: {
    LOG_LEVEL: { type: 'string', default: 'info' },
    LOG_PRETTY: { type: 'boolean', default: false },
    NODE_ENV: { type: 'string', default: 'development' },
    PORT: { type: 'number', default: 4444 },
    APOLLO_SERVER_PLAYGROUND_ENABLE: { type: 'boolean', default: false },
    OPENID_CLIENT_ID: { type: 'string' },
    OPENID_CLIENT_SECRET: { type: 'string' },
    OPENID_ISSUER: { type: 'string' },
    ACCESS_LOG_ENABLE: { type: 'boolean', default: false },
    GQL_SHIELD_DEBUG: { type: 'boolean', default: false },
    PRISMA_LOG_LEVELS: {
      type: 'string',
      default: '',
      pattern: '^((query|info|warn|error)+(,)?)*$',
    },
    NEXTAUTH_SECRET: { type: 'string' },
  },
  required: [
    'OPENID_CLIENT_ID',
    'OPENID_CLIENT_SECRET',
    'OPENID_ISSUER',
    'NEXTAUTH_SECRET',
  ],
})

export const {
  LOG_LEVEL,
  LOG_PRETTY,
  NODE_ENV,
  PORT,
  APOLLO_SERVER_PLAYGROUND_ENABLE,
  OPENID_CLIENT_ID,
  OPENID_CLIENT_SECRET,
  OPENID_ISSUER,
  ACCESS_LOG_ENABLE,
  GQL_SHIELD_DEBUG,
  PRISMA_LOG_LEVELS,
  NEXTAUTH_SECRET,
} = parse(process.env)
