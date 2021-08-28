import * as JWT from 'jsonwebtoken'
import { makeDebug } from '../lib/makeDebug'
import {
  JWT_AUTHORITY_ISSUER,
  JWT_AUTHORITY_ISSUER_SHARED_SECRET,
} from './environment'

const debug = makeDebug('server/jwt')
debug('init jwt with %O', {
  JWT_AUTHORITY_ISSUER,
  JWT_AUTHORITY_ISSUER_SHARED_SECRET,
})

export const sign = (user: unknown): string =>
  JWT.sign({ user }, JWT_AUTHORITY_ISSUER_SHARED_SECRET, {
    expiresIn: '1 day',
    issuer: JWT_AUTHORITY_ISSUER,
  })

export const validate = (authorization: string): JWT.JwtPayload => {
  const jwt = (/(Bearer )?(.+)/.exec(authorization) ?? [])[2]
  return JWT.verify(jwt, JWT_AUTHORITY_ISSUER_SHARED_SECRET, {
    issuer: JWT_AUTHORITY_ISSUER,
  }) as JWT.JwtPayload
}
