import { NextPage } from 'next'
import Link from 'next/link'
import withRedirectIfNotInitialized from '../lib/withRedirectIfNotInitialized'

export const getServerSideProps = withRedirectIfNotInitialized()

const HomePage: NextPage = () => (
  <>
    <h1>Welcome to Coffee Chat</h1>
    <p>This is work in progress</p>
    <Link href="/login/oidc" passHref>
      <button type="button">log in here</button>
    </Link>
  </>
)

export default HomePage
