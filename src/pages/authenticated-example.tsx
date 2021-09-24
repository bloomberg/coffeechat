import { NextPage } from 'next'
import withRedirectIfNotInitialized from '../lib/withRedirectIfNotInitialized'

export const getServerSideProps = withRedirectIfNotInitialized()

const AuthenticatedExample: NextPage = () => (
  <>
    <h1>If you're seeing this you're logged in</h1>
    <p>I need Auth</p>
  </>
)

export default AuthenticatedExample
