import NextAuth from 'next-auth'
import { makeDebug } from '../../../lib/makeDebug'

import {
  OPENID_ISSUER,
  OPENID_CLIENT_ID,
  OPENID_CLIENT_SECRET,
} from '../../../server/environment'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../server/gql/prisma'

const debug = makeDebug('next-auth')

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    {
      id: 'oidc',
      name: 'oidc',
      type: 'oauth',
      clientId: OPENID_CLIENT_ID,
      clientSecret: OPENID_CLIENT_SECRET,
      wellKnown: `${OPENID_ISSUER}/.well-known/openid-configuration`,
      authorization: { params: { scope: 'openid email profile' } },
      idToken: true,
      checks: ['pkce', 'state'],
      profile({
        emailAddress,
        sub: id,
        given_name,
        family_name,
        email = emailAddress,
        picture: image,
      }: OpenIDProfile) {
        debug('profile %O', {
          id,
          given_name,
          family_name,
          email,
          image,
        })
        return {
          id,
          name: `${given_name} ${family_name}`,
          email,
          image,
        }
      },
    },
  ],
})

interface OpenIDProfile {
  sub: string
  given_name: string
  family_name: string
  // some OIDC providers use email
  // and other use emailAddress
  emailAddress: string
  email: string
  picture: string
}
