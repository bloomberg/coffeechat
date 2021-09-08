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
  OPENID_CALLBACK_BASE_URL: string
  OPENID_CLIENT_ID: string
  OPENID_CLIENT_SECRET: string
  ACCESS_LOG_ENABLE: boolean
  JWT_AUTHORITY_ISSUER_SHARED_SECRET: string
  JWT_AUTHORITY_ISSUER: string
  SESSION_SECRET: string
  GQL_BACKEND_URL: string
  GQL_SHIELD_DEBUG: boolean
  PRISMA_LOG_LEVELS: string
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
    OPENID_CALLBACK_BASE_URL: {
      type: 'string',
      default: 'http://localhost:3000',
    },
    ACCESS_LOG_ENABLE: { type: 'boolean', default: false },
    JWT_AUTHORITY_ISSUER_SHARED_SECRET: { type: 'string' },
    JWT_AUTHORITY_ISSUER: { type: 'string' },
    SESSION_SECRET: { type: 'string' },
    GQL_BACKEND_URL: { type: 'string' },
    GQL_SHIELD_DEBUG: { type: 'boolean', default: false },
    PRISMA_LOG_LEVELS: {
      type: 'string',
      default: '',
      pattern: '^((query|info|warn|error)+(,)?)*$',
    },
  },
  required: [
    'OPENID_CLIENT_ID',
    'OPENID_CLIENT_SECRET',
    'OPENID_ISSUER',
    'JWT_AUTHORITY_ISSUER',
    'JWT_AUTHORITY_ISSUER_SHARED_SECRET',
    'SESSION_SECRET',
    'GQL_BACKEND_URL',
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
  OPENID_CALLBACK_BASE_URL,
  JWT_AUTHORITY_ISSUER,
  JWT_AUTHORITY_ISSUER_SHARED_SECRET,
  SESSION_SECRET,
  GQL_BACKEND_URL,
  GQL_SHIELD_DEBUG,
  PRISMA_LOG_LEVELS,
} = parse(process.env)
