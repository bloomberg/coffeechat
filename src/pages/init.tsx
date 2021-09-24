import { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { gql, request } from 'graphql-request'
import { Response } from 'express'
import { NEXT_PUBLIC_GQL_BACKEND_URL } from '../server/environment'
import { InitPageQuery } from '../generated/graphql'
import { INITIALIZED_COOKIE_NAME } from '../lib/withRedirectIfNotInitialized'
import AlreadyInitialized from '../components/initialization/AlreadyInitialized'
import InitializationSuccessful from '../components/initialization/InitializationSuccessful'
import InitializationInProgress, {
  SubmissionStatus,
} from '../components/initialization/InitializationInProgress'

interface InitPageProps {
  isInitialized: boolean
}

export const getServerSideProps: GetServerSideProps<InitPageProps> = async (
  context
) => {
  const { req, res } = context

  if (req.cookies[INITIALIZED_COOKIE_NAME]) {
    return { props: { isInitialized: true } }
  }

  const { isInitialized } = await request<InitPageQuery>(
    NEXT_PUBLIC_GQL_BACKEND_URL,
    gql`
      query InitPage {
        isInitialized
      }
    `
  )

  if (isInitialized) {
    ;(res as Response).cookie(INITIALIZED_COOKIE_NAME, 'true')
  }

  return { props: { isInitialized } }
}

const InitPage: NextPage<InitPageProps> = ({
  isInitialized,
}: InitPageProps) => {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('')

  if (isInitialized) {
    return <AlreadyInitialized />
  }
  if (submissionStatus === 'success') {
    return <InitializationSuccessful />
  }
  return <InitializationInProgress setSubmissionStatus={setSubmissionStatus} />
}

export default InitPage
