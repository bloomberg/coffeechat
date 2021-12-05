import { NextPage } from 'next'
import Link from 'next/link'
import Title from '../components/Title'
import PrimaryButton from '../components/PrimaryButton'

const HomePage: NextPage = () => (
  <>
    <Title>Welcome to Coffee Chat</Title>
    <p>This is work in progress</p>
    <Link href="/login/oidc" passHref>
      <PrimaryButton>Sign In with OSS</PrimaryButton>
    </Link>
  </>
)

export default HomePage
