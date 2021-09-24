import { IResolvers } from 'graphql-tools'
import { user as TUser } from '@prisma/client'
import prisma from '../prisma'
import { isNotInitialized } from '../shield'

export const resolvers: IResolvers = {
  Query: {
    isInitialized: () =>
      prisma.system_role_assignment
        .findFirst({
          where: { role: { name: 'admin' } },
        })
        .then((value) => Boolean(value)),
  },
  Mutation: {
    initialize: (
      _,
      { given_name, family_name, email }: TUser & { email: string }
    ) =>
      prisma.user.create({
        data: {
          given_name,
          family_name,
          emails: { create: [{ email }] },
          system_role_assignments: {
            create: [
              {
                role: { create: { name: 'admin' } },
              },
            ],
          },
        },
      }),
  },
}

export const permissions = {
  Mutation: {
    initialize: isNotInitialized,
  },
}
