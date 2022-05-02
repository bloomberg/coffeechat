import { createContext, FC, useState } from 'react'
import { SessionData } from '../types/expressSession'

interface UserSession {
  session?: SessionData
  setSession: (session: SessionData) => void
}

export const UserContext = createContext<UserSession>({
  setSession: () => {},
})

export const UserContextProvider: FC = ({ children }) => {
  const [session, setSession] = useState<SessionData | undefined>()
  return (
    <UserContext.Provider value={{ session, setSession }}>
      {children}
    </UserContext.Provider>
  )
}
