import './handleProcessErrors'
import next from 'next'
import passport from 'passport'
import express from 'express'
import cookieSession from 'cookie-session'
import cookieParser from 'cookie-parser'
import log from './log'
import {
  PORT as port,
  NODE_ENV,
  OPENID_CALLBACK_BASE_URL,
  SESSION_SECRET,
  SESSION_SECURE,
  SESSION_MAX_AGE_MILLIS,
} from './environment'
import accessLog from './express/middlewares/accessLog'
import initPassport from './express/middlewares/passport'
import { makeOpenIdStrategy } from './express/middlewares/passport/openId'
import { jwtHandler } from './express/handlers/jwt'
import startApolloServer from './gql/apolloServer'
import { makeDebug } from '../lib/makeDebug'

const OPENID_CALLBACK_PATH = '/auth/example/callback'
const debug = makeDebug('server')

const REGISTERED_OPENID_REDIRECT = `${OPENID_CALLBACK_BASE_URL}${OPENID_CALLBACK_PATH}`

log.info(
  { REGISTERED_OPENID_REDIRECT },
  'make sure this url is registered with your Open Id connect authority. e.g.: google'
)

async function start(): Promise<void> {
  log.info({ NODE_ENV }, 'application starting')

  const server = express()
  server.use(
    cookieSession({
      secret: SESSION_SECRET,
      maxAge: SESSION_MAX_AGE_MILLIS,
      secureProxy: SESSION_SECURE,
      httpOnly: true,
    })
  )
  server.use(cookieParser())
  server.use(accessLog)

  initPassport(server, await makeOpenIdStrategy(REGISTERED_OPENID_REDIRECT))

  server.get('/jwt', jwtHandler)
  server.get(
    OPENID_CALLBACK_PATH,
    passport.authenticate('oidc', { failureRedirect: '/' }),
    (request, response) => {
      const { url, query } = request
      debug('callback path %O', { url, query })
      response.redirect('/authenticated-example')
    }
  )
  server.get('/login/oidc', passport.authenticate('oidc'))
  server.get('/logout', (request, response) => {
    request.logOut()
    response.redirect('/')
  })

  server.disable('x-powered-by')
  server.set('trust-proxy', true)

  const apolloServer = await startApolloServer()
  apolloServer.applyMiddleware({ app: server })

  const nextjsApp = next({
    dev: NODE_ENV !== 'production',
    quiet: true,
  })
  await nextjsApp.prepare()
  const nextHandler = nextjsApp.getRequestHandler()
  server.all('*', (request, response) => {
    void nextHandler(request, response)
  })

  server.listen(port)
  log.info({ port }, 'process started')
}

start().catch((error) => {
  log.fatal(error, 'cannot start the server')
  // we're catching a fatal error, so returning 1 is warranted
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1)
})
