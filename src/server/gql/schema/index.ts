import { makeExecutableSchema } from 'graphql-tools'
import { applyMiddleware } from 'graphql-middleware'
import merge from 'lodash.merge'
import { shield } from 'graphql-shield'
import { gql } from 'apollo-server-express'
import * as GqlScalars from 'graphql-scalars'
import * as User from './User'
import * as Email from './Email'
import { GQL_SHIELD_DEBUG } from '../../environment'

const typeDefs = gql`
  type Query {
    email(email: String!): Email
  }
  type Mutation {
    addUser(email: String!, given_name: String!, family_name: String!): User
  }
`

const schema = makeExecutableSchema({
  typeDefs: [...GqlScalars.typeDefs, typeDefs, User.typeDefs, Email.typeDefs],
  resolvers: [merge(GqlScalars.resolvers, User.resolvers, Email.resolvers)],
})

const permissions = shield(merge(User.permissions, Email.permissions), {
  debug: GQL_SHIELD_DEBUG,
})

export default applyMiddleware(schema, permissions)
