import { makeExecutableSchema } from 'graphql-tools'
import { applyMiddleware } from 'graphql-middleware'
import merge from 'lodash.merge'
import { shield } from 'graphql-shield'
import { gql } from 'apollo-server-core'
import * as GqlScalars from 'graphql-scalars'
import * as User from './User'
import { GQL_SHIELD_DEBUG } from '../../environment'

const typeDefs = gql`
  type Query {
    user(email: String): User
  }
`

const schema = makeExecutableSchema({
  typeDefs: [...GqlScalars.typeDefs, typeDefs, User.typeDefs],
  resolvers: [merge(GqlScalars.resolvers, User.resolvers)],
})

const permissions = shield(User.permissions, {
  debug: GQL_SHIELD_DEBUG,
})

export default applyMiddleware(schema, permissions)
