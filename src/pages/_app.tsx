import { FC } from 'react'
import { AppProps } from 'next/app'
import '../styles/fonts'
import '../styles/globals.css'

import { SessionProvider, useSession, signOut } from 'next-auth/react'
import { Session } from 'next-auth'

const AppBar: FC = () => {
  const { data: session } = useSession()
  return (
    <div className="flex flex-row py-4 px-8 items-baseline justify-between">
      <div className="text-3xl font-display font-extrabold">Coffee Chat</div>
      {session && (
        <div className="flex flex-row space-x-7">
          <div className="flex flex-row space-x-3">
            <div className="rounded-full bg-slate-500 w-6"></div>
            <span className="flex ">Hi, {session.user?.name}</span>
          </div>
          <button
            type="button"
            className="flex hover:underline"
            onClick={() => void signOut({ callbackUrl: '/' })}
          >
            logout
          </button>
        </div>
      )}
    </div>
  )
}

type CoffeechatAppProperties = { session: Session | null } & Record<
  string,
  unknown
>

const CoffeeChatApp: FC<AppProps<CoffeechatAppProperties>> = ({
  Component,
  pageProps: { session, ...pageProperties },
}) => {
  return (
    <SessionProvider session={session}>
      <AppBar />
      <Component {...pageProperties} />
    </SessionProvider>
  )
}

export default CoffeeChatApp
