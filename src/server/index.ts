import next from 'next'
import passport from 'passport'
import { Strategy } from 'passport-saml'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import fs from 'fs'
import log, { final } from './log'
import createServer from './createServer'
import { PORT as port, NODE_ENV } from './env'

process.on(
  'SIGINT',
  final((_, finalLogger) => {
    finalLogger.info('Exiting')
    process.exit(0)
  }) as () => void
)

process.on(
  'uncaughtException',
  final((error, finalLogger) => {
    finalLogger.fatal(error, 'unhandled')
    process.exit(1)
  })
)

// the node api is Error | any
// per the docs https://nodejs.org/api/process.html#process_event_unhandledrejection
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('unhandledRejection', (reason: Error | any) => {
  log.warn(reason, 'Unhandled rejection')
})

async function start(): Promise<void> {
  log.info({ NODE_ENV }, 'application starting')
  const app = next({
    dev: NODE_ENV !== 'production',
    quiet: true,
  })
  await app.prepare()
  const handle = app.getRequestHandler()
  const server = createServer({
    nextHandler: (req, res) => handle(req, res),
  })
  server.use(cookieParser())
  server.use(
    session({
      secret: 'some secret', // N.B. please don't put secrets in code...
      saveUninitialized: true,
      resave: false,
    })
  )
  // configure SAML strategy
  passport.use(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    new Strategy(
      {
        path: '/login/callback',
        entryPoint: 'https://bssobeta.bloomberg.com/idp/SSO.saml2',
        issuer: 'WebChampBSSOSample',
        cert: fs.readFileSync('./idp_cert.crt', 'utf-8'),
        privateCert: fs.readFileSync('./my_key.key', 'utf-8'),
        identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
      },
      (profile: any, done: any) => {
        done(null, profile)
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user: any, done) => done(null, user))

  server.use(passport.initialize())
  server.use(passport.session())
  server.get(
    '/login',
    passport.authenticate('saml', {
      successRedirect: '/',
      failureRedirect: '/login',
    })
  )

  server.post(
    '/login/callback',
    passport.authenticate('saml', {
      failureRedirect: '/',
      failureFlash: true,
    }),
    (req, res) => {
      res.redirect('/')
    }
  )

  server.listen(port)
  log.info({ port }, 'process started')
}

start().catch((error) => {
  log.fatal(error, 'cannot start the server')
  process.exit(1)
})
