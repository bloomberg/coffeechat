import Router from 'next/router'
import { useContext, useEffect } from 'react'
import useSWR from 'swr'
import { UserContext } from '../context/UserContext'
import { SessionData } from '../types/expressSession'

export default function AuthGuard({
  children,
}: {
  children: JSX.Element
}): JSX.Element {
  const { data, error } = useSWR<SessionData | null, Error>('/jwt')
  const { setSession } = useContext(UserContext)

  useEffect(() => {
    if (error || (data && !data.user)) {
      void Router.push('/login/oidc')
    } else if (data) {
      setSession(data)
    }

    // do not depend on const coming from useContext
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data])
  if (!data && !error) {
    return <h1>Loading...</h1>
  }

  if (data && !data.user.system.isInitialized) {
    void Router.push('/system/initialize')
    return <h1>Loading...</h1>
  }
  return children
}
