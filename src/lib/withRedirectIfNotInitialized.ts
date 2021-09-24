import { Response } from 'express'
import { gql, request } from 'graphql-request'
import { GetServerSideProps } from 'next'
import { IsInitializedQuery } from '../generated/graphql'
import { NEXT_PUBLIC_GQL_BACKEND_URL } from '../server/environment'

export const INITIALIZED_COOKIE_NAME = 'coffee-chat-is-initialized'

export default function withRedirectIfNotInitialized<P>(
  callback: GetServerSideProps<P> = async () => ({ props: {} as P })
): GetServerSideProps<P> {
  return async function wrapper(context) {
    const { req, res } = context

    if (req.cookies[INITIALIZED_COOKIE_NAME]) {
      return callback(context)
    }

    const { isInitialized } = await request<IsInitializedQuery>(
      NEXT_PUBLIC_GQL_BACKEND_URL,
      gql`
        query IsInitialized {
          isInitialized
        }
      `
    )

    if (isInitialized) {
      ;(res as Response).cookie(INITIALIZED_COOKIE_NAME, 'true')
      return callback(context)
    }

    return { redirect: { destination: '/init', permanent: false } }
  }
}
