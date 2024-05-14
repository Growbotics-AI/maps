// src/lib/UserContext.tsx
import { useSession } from 'next-auth/react'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface User {
  name?: string | null
  email?: string | null
  image?: string | null
}

interface UserContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession()
  const [user, setUser] = useState<User | null>(session?.user || null)

  useEffect(() => {
    if (session?.user) {
      setUser(session.user)
    } else {
      setUser(null)
    }
  }, [session])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
