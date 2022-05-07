import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  const { data } = useSession({
    required: true,
    onUnauthenticated: () => void router.push('/'),
  })
  return (
    <>
      <div className="p-10">
        <h2>Welcome to the homepage</h2>
        <p>{data?.user?.name}</p>
      </div>
    </>
  )
}
export default Home
