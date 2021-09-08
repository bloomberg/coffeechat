import passport from 'passport'
import { Express } from 'express'
import * as OpenId from 'openid-client'
import { callbackify } from 'util'

export default function initPassport(
  server: Express,
  openIdStrategy: OpenId.Strategy<Record<string, string>, OpenId.Client>
): passport.PassportStatic {
  passport.use('oidc', openIdStrategy)
  passport.serializeUser(callbackify(async (user: Express.User) => user))
  passport.deserializeUser(callbackify(async (user: Express.User) => user))
  server.use(passport.initialize())
  server.use(passport.session())
  return passport
}
