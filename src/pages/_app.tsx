import { FC, useContext } from 'react'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import '../styles/fonts'
import '../styles/globals.css'
import { UserContext, UserContextProvider } from '../context/UserContext'

const AppBar: FC = () => {
  const { session } = useContext(UserContext)
  return (
    <div className="flex flex-row py-4 px-8 items-baseline justify-between">
      <div className="text-3xl font-display font-extrabold">Coffee Chat</div>
      {session && (
        <div className="flex flex-row space-x-7">
          <div className="flex flex-row space-x-3">
            <div className="rounded-full bg-slate-500 w-6"></div>
            <span className="flex ">Hi, {session.user.given_name}</span>
          </div>
          <a className="flex hover:underline" href="/logout">
            logout
          </a>
        </div>
      )}
    </div>
  )
}

const EmotionNextjsApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SWRConfig
      value={{
        fetcher<T>(url: string): Promise<T> {
          return fetch(url).then((response) => response.json() as unknown as T)
        },
      }}
    >
      <UserContextProvider>
        <AppBar />
        <Component {...pageProps} />
      </UserContextProvider>
    </SWRConfig>
  )
}

export default EmotionNextjsApp
