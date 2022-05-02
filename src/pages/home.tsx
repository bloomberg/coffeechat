import { NextPage } from 'next'
import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { SessionData } from '../types/expressSession'
import { UserContext } from '../context/UserContext'

const Home: NextPage = () => {
  const { data, error } = useSWR<SessionData | null, Error>('/jwt')

  const { session, setSession } = useContext(UserContext)

  useEffect(() => {
    if (error || (data && !data.user)) {
      void Router.push('/login/oidc')
    } else if (data) {
      setSession(data)
    }

    // do not depend on const coming from useContext
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data])

  return (
    <>
      {!data && !error && <h2>Loading</h2>}
      {session?.user?.given_name && (
        <div className="p-10">
          <h2>Welcome to the homepage, {session.user.given_name}</h2>
        </div>
      )}
    </>
  )
}
export default Home
