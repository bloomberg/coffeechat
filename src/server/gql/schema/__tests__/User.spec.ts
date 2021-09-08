import { email as TEmail, PrismaClient } from '@prisma/client'
import { ApolloServer, ExpressContext, gql } from 'apollo-server-express'
import { mockReset } from 'jest-mock-extended'
import { DeepMockProxy } from 'jest-mock-extended/lib/mjs/Mock'
import { GraphQLResponse } from 'apollo-server-types'
import { GraphQLError } from 'graphql'
import { sign } from '../../../jwt'
import startApolloServer from '../../apolloServer'
import prisma from '../../prisma'

jest.mock('../../prisma')

describe('User schema', () => {
  let apollo: ApolloServer
  let prismaMock: DeepMockProxy<PrismaClient>

  beforeEach(async () => {
    mockReset(prisma)
    prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
    apollo = await startApolloServer()
  })

  describe('addUser mutation', () => {
    const user = {
      family_name: 'Smith',
      given_name: 'Peter',
    }
    const id = 'randomId'
    const email = 'peter@random.go'
    let data: GraphQLResponse['data']

    async function executeAddUserQuery(
      authorization?: string
    ): Promise<GraphQLResponse> {
      return apollo.executeOperation(
        {
          query: gql`
            mutation AddUserTest(
              $email: String!
              $given_name: String!
              $family_name: String!
            ) {
              addUser(
                email: $email
                given_name: $given_name
                family_name: $family_name
              ) {
                id
                given_name
                family_name
                emails {
                  email
                }
                system_roles
              }
            }
          `,
          variables: { ...user, email },
        },
        {
          req: {
            headers: { ...(authorization && { authorization }) },
          },
        } as ExpressContext
      )
    }

    beforeEach(() => {
      prismaMock.user.create.mockResolvedValue({
        ...user,
        id,
        created_at: new Date(),
      })
      prismaMock.email.findMany.mockResolvedValue([{ email } as TEmail])
      prismaMock.system_role_assignment.findMany.mockResolvedValue([])
      prismaMock.system_role.findUnique.mockResolvedValue({
        id: 'sId',
        name: 'admin',
      })
    })
    describe('when jwt is not present', () => {
      it('fails', async () => {
        expect(await executeAddUserQuery()).toMatchObject({
          errors: [new GraphQLError('Not Authorised!')],
        })
      })
    })

    describe('when jwt is valid', () => {
      describe('when email does not match jwt', () => {
        it('fails', async () => {
          expect(
            await executeAddUserQuery(sign({ email: 'other@mail.me' }))
          ).toMatchObject({
            data: {
              addUser: null,
            },
            errors: [new GraphQLError('Not Authorised!')],
          })
        })
      })
      describe('when email matches jwt', () => {
        beforeEach(async () => {
          ;({ data } = await executeAddUserQuery(sign({ email })))
        })
        it('returns the created user', async () => {
          expect(data).toEqual({
            addUser: {
              ...user,
              id,
              emails: [{ email }],
              system_roles: [],
            },
          })
        })
        it('calls user.create', () => {
          expect(prisma.user.create).toHaveBeenCalledWith({
            data: {
              ...user,
              emails: { create: [{ email }] },
            },
          })
        })
      })
    })
  })
})
