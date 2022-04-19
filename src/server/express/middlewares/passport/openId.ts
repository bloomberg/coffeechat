import * as OpenId from 'openid-client'
import { gql, request } from 'graphql-request'
import { callbackify } from 'util'
import { UserInfo } from '../../../../types/expressSession'
import {
  OPENID_ISSUER,
  OPENID_CLIENT_ID,
  OPENID_CLIENT_SECRET,
  GQL_BACKEND_URL,
} from '../../../environment'

import log from '../../../log'
import {
  AddUserMutation,
  AddUserMutationVariables,
  FindUserQuery,
  FindUserQueryVariables,
} from '../../../../generated/graphql'
import { sign } from '../../../jwt'
import { makeDebug } from '../../../../lib/makeDebug'

const debug = makeDebug('openId')
/**
 * find the 3rd party (openid-connect) user in this app's system
 * http://www.passportjs.org/docs/configure/#verify-callback
 *
 * @param _  Ignored tokenset param
 * @param userinfoResponse coming back from openId endpoint
 * @returns the user created or found in the app's system
 */
async function verify(
  _: OpenId.TokenSet,
  {
    given_name,
    family_name,
    emailAddress,
    email = emailAddress as string,
  }: OpenId.UserinfoResponse
): Promise<UserInfo> {
  try {
    if (!email || !family_name || !given_name) {
      throw new Error(
        `invalid user info ${JSON.stringify({
          emailAddress,
          family_name,
          given_name,
        })}`
      )
    }

    const user = { email, family_name, given_name }

    debug('Openid verify callback %O', { user })

    if (!given_name || !family_name) {
      throw new Error('invalid new user')
    }

    const Authorization = `Bearer ${sign({ email })}`
    debug('Generated temporary authentication %O', { Authorization })

    const { email: foundEmail } = await request<
      FindUserQuery,
      FindUserQueryVariables
    >(
      GQL_BACKEND_URL,
      gql`
        query FindUser($email: String!) {
          email(email: $email) {
            user {
              id
              family_name
              given_name
              system_roles
            }
          }
        }
      `,
      { email },
      { Authorization }
    )

    debug('FindUser: existing email found %O', { foundEmail })

    if (foundEmail) {
      return {
        ...foundEmail.user,
        email,
      }
    }

    debug('creating new user %O', { email })

    const { addUser: newUser } = await request<
      AddUserMutation,
      AddUserMutationVariables
    >(
      GQL_BACKEND_URL,
      gql`
        mutation AddUser(
          $email: String!
          $given_name: String!
          $family_name: String!
        ) {
          addUser(
            email: $email
            given_name: $given_name
            family_name: $family_name
          ) {
            family_name
            given_name
            id
            emails {
              email
            }
            system_roles
          }
        }
      `,
      user,
      { Authorization }
    )
    if (!newUser) {
      throw new Error('User was not created succesfully')
    }

    debug('AddUser: created new user %O', { newUser })
    return {
      ...newUser,
      email,
    }
  } catch (error) {
    if (error instanceof Error) {
      log.warn(error, 'Error while creating user')
    } else {
      log.warn(`Error while creting user ${JSON.stringify(error)}`)
    }
    throw error
  }
}
export async function makeOpenIdStrategy(
  redirectPath: string
): Promise<OpenId.Strategy<UserInfo, OpenId.Client>> {
  const issuer = await OpenId.Issuer.discover(
    `${OPENID_ISSUER}/.well-known/openid-configuration`
  )
  log.info({ discover: issuer }, 'openid discover')

  const strategy = new OpenId.Strategy(
    {
      client: new issuer.Client({
        client_id: OPENID_CLIENT_ID,
        client_secret: OPENID_CLIENT_SECRET,
        response_types: ['code'],
        redirect_uris: [redirectPath],
      }),
      params: { scope: 'openid profile email' },
    },
    callbackify(verify)
  )

  return strategy
}
