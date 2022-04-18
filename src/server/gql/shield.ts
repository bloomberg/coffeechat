import { rule } from 'graphql-shield'
import { IRuleFunction } from 'graphql-shield/dist/types'
import { UserInfo } from '../../types/expressSession'
import { makeDebug } from '../../lib/makeDebug'

const debug = makeDebug('gql:shield:permissions')

interface TContext {
  token?: {
    user?: UserInfo
  }
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

export const isAdmin = withDebug('isAdmin')(
  async (parent, parameters, context: TContext) =>
    (context.token?.user?.system_roles ?? []).includes('admin')
)

export const isSelf = withDebug('isSelf')(
  async (parent, { email }, context: TContext) =>
    email === context.token?.user?.email
)
