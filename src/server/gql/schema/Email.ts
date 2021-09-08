import { email as TEmail } from '@prisma/client'
import { gql } from 'apollo-server-express'
import { IResolvers } from 'graphql-tools'
import prisma from '../prisma'
import { isAuthenticated } from '../shield'

export const typeDefs = gql`
  type Email {
    email: String!
    user: User!
  }
`
export const resolvers: IResolvers = {
  Query: {
    email: async (_, { email }: TEmail) =>
      prisma.email.findUnique({
        where: {
          email,
        },
      }),
  },
  Email: {
    user: async ({ user_id }: TEmail) =>
      prisma.user.findUnique({
        where: {
          id: user_id,
        },
      }),
  },
}

export const permissions = {
  Query: {
    email: isAuthenticated,
  },
}
