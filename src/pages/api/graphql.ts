import { ApolloServer } from 'apollo-server-micro'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core'
import { makeDebug } from '../../lib/makeDebug'
import { getToken } from 'next-auth/jwt'
import schema from '../../server/gql/schema'
import {
  APOLLO_SERVER_PLAYGROUND_ENABLE,
  NEXTAUTH_SECRET,
} from '../../server/environment'
import { NextApiRequest, NextApiResponse } from 'next'

const debug = makeDebug('apolloServer')

const apolloServer = new ApolloServer({
  context: async ({ req }: { req: NextApiRequest }) => {
    const token = await getToken({ req, secret: NEXTAUTH_SECRET })
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
const startServer = apolloServer.start()

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(request, response)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
