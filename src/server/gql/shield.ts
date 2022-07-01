import { rule } from 'graphql-shield'
import { IRuleFunction } from 'graphql-shield/dist/types'
import { makeDebug } from '../../lib/makeDebug'
import { JWT } from 'next-auth/jwt'

const debug = makeDebug('gql:shield:permissions')

interface TContext {
  token?: JWT | null
}

debug('initializing permission')

const withDebug = (name: string) => (ruleFunction: IRuleFunction) =>
  rule(name)(async (parent, parameters, context: TContext, info) => {
    const result = await ruleFunction(parent, parameters, context, info)
    debug('permissions result %O', { name, result, context: context.token })
    return result
  })

export const isAuthenticated = withDebug('isAuthenticated')(
  async (parent, parameters, context: TContext) => Boolean(context.token)
)
