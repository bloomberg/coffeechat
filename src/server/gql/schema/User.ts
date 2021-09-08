import { gql } from 'apollo-server-express'
import { user as TUser } from '@prisma/client'
import { IResolvers } from 'graphql-tools'
import { or } from 'graphql-shield'
import { isAdmin, isSelf } from '../shield'
import prisma from '../prisma'

export const typeDefs = gql`
  type User {
    id: String!
    given_name: String!
    family_name: String!
    emails: [Email!]!
    system_roles: [String!]!
    created_at: DateTime!
  }
`

export const resolvers: IResolvers = {
  User: {
    system_roles: async (user: TUser) => {
      const foundSystemRoleAssignments =
        await prisma.system_role_assignment.findMany({
          where: {
            user,
          },
          include: {
            role: true,
          },
        })
      return foundSystemRoleAssignments.map(({ role }) => role.name)
    },
    emails: ({ id: user_id }: TUser) =>
      prisma.email.findMany({ where: { user_id } }),
  },
  Mutation: {
    addUser: (
      _,
      { given_name, family_name, email }: TUser & { email: string }
    ) =>
      prisma.user.create({
        data: {
          given_name,
          family_name,
          emails: { create: [{ email }] },
        },
      }),
  },
}

export const permissions = {
  Mutation: {
    addUser: or(isSelf, isAdmin),
  },
}
