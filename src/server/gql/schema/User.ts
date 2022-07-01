import { gql } from 'apollo-server-core'
import { IResolvers } from 'graphql-tools'
import prisma from '../prisma'
import { isAuthenticated } from '../shield'

export const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
  }
`

export const resolvers: IResolvers = {
  Query: {
    user: (_, { email }: { email: string }) =>
      prisma.user.findUnique({
        where: {
          email,
        },
      }),
  },
}

export const permissions = {
  Query: {
    user: isAuthenticated,
  },
}
