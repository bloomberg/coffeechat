import { Handler, Request } from 'express'
import { makeDebug } from '../../../lib/makeDebug'
import { sign } from '../../jwt'

const debug = makeDebug('express:handlers:jwt')

export const jwtHandler: Handler = (request: Request, response) => {
  const { user } = request
  const authenticated = request.isAuthenticated()
  debug('user/session %O', {
    user,
    authenticated,
  })

  response.send(sign(user))
}
