import { NextPage } from 'next'
import PageTitle from '../components/PageTitle'
import Button from '../components/Button'
import {
  ClientSafeProvider,
  LiteralUnion,
  signIn,
  useSession,
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type ProviderRecord = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>
interface IndexProperties {
  providers: ProviderRecord
}

const IndexPage: NextPage<IndexProperties> = () => {
  const router = useRouter()
  const { status } = useSession()
  useEffect(() => {
    if (status === 'authenticated') {
      void router.push('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <div className="container mx-auto mt-11 px-4 pt-4 pb-10 space-y-3 w-80 bg-slate-100 text-center">
      <PageTitle>Welcome!</PageTitle>
      <div className="pt-10">
        <Button
          onClick={() => void signIn('oidc', { callbackUrl: '/home' })}
          type="button"
        >
          log in
        </Button>
      </div>
    </div>
  )
}

export default IndexPage
