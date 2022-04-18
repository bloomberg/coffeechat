import { IResolvers } from 'graphql-tools'
import { makeDebug } from '../../../lib/makeDebug'
import { UserInfo } from '../../../types/expressSession'
import prisma from '../prisma'
import { isAuthenticated } from '../shield'

import { system_action_type } from '@prisma/client'
import { gql } from 'apollo-server-express'

const debug = makeDebug('coffee:gql:SystemAdmin')

// TODO: this is duplicated, de-duplicate
interface TContext {
  token?: {
    user?: UserInfo
  }
}

export const typeDefs = gql`
  type RoleAssignment {
    system_role_id: String!
    user_id: String!
    id: String!
    created_at: DateTime!
  }
`

export const resolvers: IResolvers = {
  Mutation: {
    claimSystemAdmin: async (parent, parameters, context: TContext) => {
      const adminRole = await prisma.system_role.findUnique({
        where: {
          name: 'admin',
        },
      })

      if (!adminRole) {
        throw new Error('admin role not found')
      }

      const adminAssignments = await prisma.system_role.findUnique({
        where: {
          id: adminRole.id,
        },
        include: {
          assignments: {
            include: {
              user: true,
            },
          },
        },
      })

      if (
        adminAssignments &&
        adminAssignments.assignments &&
        adminAssignments.assignments.length > 0
      ) {
        const [
          {
            user: { given_name, family_name },
          },
        ] = adminAssignments.assignments
        throw new Error(
          `${given_name} ${family_name} has already claimed admin`
        )
      }

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

      const created = await prisma.system_role_assignment.create({
        data: {
          system_role_id: adminRole.id,
          user_id: user.user_id,
        },
      })
      await prisma.system_actions.create({
        data: {
          desc: 'Initial system admin assigned',
          user_id: user.user_id,
          type: system_action_type.ASSIGN_SYSTEM_ROLE,
          related_id: created.id,
        },
      })
      debug('created %O', { created })
      return created
    },
  },
}

export const permissions = {
  Mutation: {
    claimSystemAdmin: isAuthenticated,
  },
}
