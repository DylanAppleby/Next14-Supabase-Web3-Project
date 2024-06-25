import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import LoadingPage from 'components/LoadingPage'
import { supabase } from 'services/supabase'
import { IUser } from 'types/supabaseTables'
import { Tables } from 'utils/constants'

import { Session } from '@supabase/supabase-js'

export const INITIAL_USER_DATA: IUser = {
  bio: null,
  birthday: null,
  avatar_url: null,
  circles: [],
  created_at: Date.now().toString(),
  email: null,
  first_name: null,
  followees: null,
  followers: null,
  id: '',
  last_name: null,
  user_name: null,
  notifications: [],
  read_notifications: [],
}
const AuthContext = createContext<{
  session: Session | null
  user: IUser
  setUser: Dispatch<SetStateAction<IUser>>
  signOut: () => void
}>({
  session: null,
  user: INITIAL_USER_DATA,
  setUser: () => {},
  signOut: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER_DATA)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async (sesh: Session) => {
    setIsLoading(true)

    const { data: userData } = await supabase
      .from(Tables.USERS)
      .select('*')
      .eq('id', sesh.user.id)
      .single()

    if (userData) setUser(userData)
    setSession(sesh)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((val, sesh) => {
      setSession(sesh)
      if (sesh && !user.email) fetchData(sesh)
      else if (!sesh) {
        setUser(INITIAL_USER_DATA)
        setIsLoading(false)
      } else setIsLoading(false)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [fetchData, user.email])

  const value = useMemo(
    () => ({
      session,
      user,
      setUser,
      signOut: () => supabase.auth.signOut(),
    }),
    [session, user]
  )

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <LoadingPage /> : children}
    </AuthContext.Provider>
  )
}

// export the useAuth hook
export const useAuth = () => useContext(AuthContext)
