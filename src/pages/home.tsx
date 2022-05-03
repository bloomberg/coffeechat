import { NextPage } from 'next'
import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Home: NextPage & { isProtected: boolean } = () => {
  const { session } = useContext(UserContext)

  return (
    <>
      {session?.user?.given_name && (
        <div className="p-10">
          <h2>Welcome to the homepage, {session.user.given_name}</h2>
        </div>
      )}
    </>
  )
}

Home.isProtected = true
export default Home
