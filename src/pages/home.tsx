import { NextPage } from 'next'
import React from 'react'
import useJWTSession from '../hooks/useJWTSession'

const Home: NextPage = () => {
  const { isLoading, session } = useJWTSession()

  return (
    <>
      {isLoading && <h2>Loading</h2>}
      {!isLoading && session?.user?.given_name && (
        <div className="p-10">
          <h2>Welcome to the homepage, {session.user.given_name}</h2>
        </div>
      )}
    </>
  )
}
export default Home
