import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export default makeExecutableSchema({
  typeDefs: gql`
    type Query {
      user(id: Int): User
    }
    type Mutation {
      addUser(firstName: String!): User
    }
    type User {
      id: Int
      firstName: String
    }
  `,
  resolvers: {
    Query: {
      user: (_, { id }: User) =>
        prisma.user.findUnique({
          where: {
            id,
          },
        }),
    },
    Mutation: {
      addUser: (_, { firstName }: User) =>
        prisma.user.create({ data: { firstName } }),
    },
  },
})
