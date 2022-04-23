import { useContext, useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { UserContext } from '../context/UserContext'
import { SessionData } from '../types/expressSession'

interface JWTSession {
  isLoading: boolean
  session?: SessionData
  error?: Error
}

export default function useJWTSession(): JWTSession {
  const { data, error } = useSWR<SessionData | null, Error>('/jwt')
  const { session, setSession } = useContext(UserContext)

  useEffect(() => {
    if (error || (data && !data.user)) {
      void Router.push('/login/oidc')
    } else if (data) {
      setSession(data)
    }

    // do not depend on const coming from useContext
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data])

  const isLoading = !data && !error

  return { isLoading, session: session, error }
}
