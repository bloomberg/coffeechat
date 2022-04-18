import { makeExecutableSchema } from 'graphql-tools'
import { applyMiddleware } from 'graphql-middleware'
import merge from 'lodash.merge'
import { shield } from 'graphql-shield'
import { gql } from 'apollo-server-express'
import * as GqlScalars from 'graphql-scalars'
import * as User from './User'
import * as Email from './Email'
import * as SystemAdmin from './SystemAdmin'
import { GQL_SHIELD_DEBUG } from '../../environment'

const typeDefs = gql`
  type Query {
    email(email: String!): Email
  }
  type Mutation {
    addUser(email: String!, given_name: String!, family_name: String!): User

    """
    Current user claims first admin. This will only work the first time
    it is claimed.
    """
    claimSystemAdmin: User
  }
`

const schema = makeExecutableSchema({
  typeDefs: [...GqlScalars.typeDefs, typeDefs, User.typeDefs, Email.typeDefs],
  resolvers: [
    merge(
      GqlScalars.resolvers,
      User.resolvers,
      Email.resolvers,
      SystemAdmin.resolvers
    ),
  ],
})

const permissions = shield(
  merge(User.permissions, Email.permissions, SystemAdmin.permissions),
  {
    debug: GQL_SHIELD_DEBUG,
  }
)

export default applyMiddleware(schema, permissions)
