import type * as Express from 'express'

const noOp: Express.RequestHandler = (request, response, next) => next()

export default noOp
