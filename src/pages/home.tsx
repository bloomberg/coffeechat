import { NextPage } from 'next'
import React, { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { SessionData } from '../types/expressSession'

const Home: NextPage = () => {
  const { data, error } = useSWR<SessionData | null, Error>('/jwt')

  useEffect(() => {
    if (error || (data && !data.user)) {
      void Router.push('/login/oidc')
    }
  }, [error, data])

  return (
    <>
      {!data && !error && <h1>Loading</h1>}
      {data?.user?.given_name && (
        <h1>Welcome to the homepage, {data.user.given_name}</h1>
      )}
    </>
  )
}
export default Home
