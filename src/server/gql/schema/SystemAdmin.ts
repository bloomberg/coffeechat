import { IResolvers } from 'graphql-tools'
import { makeDebug } from '../../../lib/makeDebug'
import { UserInfo } from '../../../types/expressSession'
import prisma from '../prisma'
import { isAuthenticated } from '../shield'

import { system_action_type, system_role } from '@prisma/client'
import { gql } from 'apollo-server-express'

const debug = makeDebug('coffee:gql:SystemAdmin')

// TODO: this is duplicated, de-duplicate
interface TContext {
  token?: {
    user?: UserInfo
  }
}

// TODO: Move to own typedef
export const typeDefs = gql`
  type RoleAssignment {
    user_id: String!
    id: String!
    created_at: DateTime!
    role: String!
  }
`

export const resolvers: IResolvers = {
  Mutation: {
    claimInitialSystemAdmin: async (parent, parameters, context: TContext) => {
      const email = context.token?.user?.email

      const user = await prisma.email.findUnique({
        where: {
          email,
        },
        include: {
          user: true,
        },
      })
      debug('user %O', { user })

      if (!user) {
        throw new Error(`Invalid user with email: ${email}`)
      }

      return prisma.$transaction(async (txPrisma) => {
        const roleAssignment = await txPrisma.system_role_assignment.findFirst({
          where: {
            role: system_role.ADMINISTRATOR,
          },
          include: {
            user: true,
          },
        })

        if (roleAssignment?.role) {
          const {
            user: { given_name, family_name },
          } = roleAssignment
          throw new Error(
            `${given_name} ${family_name} has already claimed admin`
          )
        }

        const created = await txPrisma.system_role_assignment.create({
          data: {
            role: system_role.ADMINISTRATOR,
            user_id: user.user_id,
          },
        })
        await txPrisma.system_actions.create({
          data: {
            desc: 'Initial system admin assigned',
            user_id: user.user_id,
            type: system_action_type.INITIAL_SYSTEM_ADMIN_CLAIM,
            related_id: created.id,
          },
        })

        debug('created %O', { created })
        return created
      })
    },
  },
}

export const permissions = {
  Mutation: {
    claimInitialSystemAdmin: isAuthenticated,
  },
}
