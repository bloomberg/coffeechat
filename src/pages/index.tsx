import { NextPage } from 'next'
import Link from 'next/link'
import PageTitle from '../components/PageTitle'
import Button from '../components/Button'
import Router from 'next/router'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const HomePage: NextPage = () => {
  const { session } = useContext(UserContext)

  if (session) {
    void Router.push('/home')
    return <h2>Loading</h2>
  }

  return (
    <div className="container mx-auto mt-11 px-4 pt-4 pb-10 space-y-3 w-80 bg-slate-100 text-center">
      <PageTitle>Welcome!</PageTitle>
      <div className="pt-10">
        <Link href="/login/oidc" passHref>
          <Button>log in</Button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
