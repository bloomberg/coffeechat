import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core'
import { APOLLO_SERVER_PLAYGROUND_ENABLE } from '../environment'
import schema from './schema'
import { validate } from '../jwt'
import { makeDebug } from '../../lib/makeDebug'

const debug = makeDebug('apolloServer')

export default async function startApolloServer(): Promise<ApolloServer> {
  const server = new ApolloServer({
    context: ({ req }) => {
      const { authorization } = req.headers
      if (!authorization) {
        return {}
      }

      const token = validate(authorization)

      debug('gql context %o', { token })

      return { token }
    },
    schema,
    introspection: true,
    plugins: [
      APOLLO_SERVER_PLAYGROUND_ENABLE
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
              'editor.theme': 'light',
              'request.credentials': 'same-origin',
            },
          }),
    ],
  })
  await server.start()
  return server
}
