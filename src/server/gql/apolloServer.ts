import { ApolloServer } from 'apollo-server-express'
import { mergeSchemas } from 'graphql-tools'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core'
import { APOLLO_SERVER_PLAYGROUND_ENABLE } from '../environment'
import User from './schema/User'

const schema = mergeSchemas({
  schemas: [User],
})

export default async function startApolloServer(): Promise<ApolloServer> {
  const server = new ApolloServer({
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
