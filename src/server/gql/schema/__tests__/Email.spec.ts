import { PrismaClient } from '@prisma/client'
import { ApolloServer, ExpressContext, gql } from 'apollo-server-express'
import { mockReset } from 'jest-mock-extended'
import { DeepMockProxy } from 'jest-mock-extended/lib/mjs/Mock'
import { GraphQLResponse } from 'apollo-server-types'
import { GraphQLError } from 'graphql'
import { sign } from '../../../jwt'
import startApolloServer from '../../apolloServer'

import prisma from '../../prisma'

jest.mock('../../prisma.ts')

describe('Email schema', () => {
  let apollo: ApolloServer
  let prismaMock: DeepMockProxy<PrismaClient>

  beforeEach(async () => {
    mockReset(prisma)
    prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
    apollo = await startApolloServer()
  })
  describe('email query', () => {
    const user = {
      family_name: 'Smith',
      given_name: 'Peter',
    }
    const id = 'randomId'
    const email = 'peter@random.go'
    const created_at = new Date()
    let data: GraphQLResponse['data']

    async function executeEmailQuery(
      authorization?: string
    ): Promise<GraphQLResponse> {
      return apollo.executeOperation(
        {
          query: gql`
            query FindUserByEmailTest($email: String!) {
              email(email: $email) {
                email
                user {
                  family_name
                  given_name
                  id
                  system_roles
                  created_at
                }
              }
            }
          `,
          variables: { email },
        },
        {
          req: {
            headers: { ...(authorization && { authorization }) },
          },
        } as ExpressContext
      )
    }
    beforeEach(() => {
      prismaMock.email.findUnique.mockResolvedValue({
        email,
        user_id: id,
      })
      prismaMock.user.findUnique.mockResolvedValue({
        ...user,
        id,
        created_at,
      })

      prismaMock.system_role_assignment.findMany.mockResolvedValue([])
      prismaMock.system_role.findUnique.mockResolvedValue({
        id: 'randomId',
        name: 'admin',
      })
    })

    describe('when jwt is not present', () => {
      it('fails', async () => {
        expect(await executeEmailQuery()).toMatchObject({
          errors: [new GraphQLError('Not Authorised!')],
        })
      })
    })
    describe('when jwt is valid', () => {
      beforeEach(async () => {
        ;({ data } = await executeEmailQuery(sign({})))
      })
      it('returns the found user', () => {
        expect(data).toEqual({
          email: {
            email,
            user: {
              ...user,
              id,
              created_at,
              system_roles: [],
            },
          },
        })
      })
    })
  })
})
