// src/contexts/AuthContext.tsx
import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react'
import { User } from '@/interfaces/user'
import {
  getUserLocalStorage,
  saveUserLocalStorage,
  removeUserLocalStorage,
} from '@/util/storage'

// Definir la interfaz para el valor del contexto
interface AuthContextType {
  user: User | null
  setUser: (
    user: User | null | ((currentUser: User | null) => User | null),
  ) => void
  isLoading: boolean
}

// Crear el contexto con un valor predeterminado que se adhiera a la interfaz
export const AuthContext = createContext<AuthContextType | null>(null)

// Componente proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const storedUser = getUserLocalStorage()
    if (storedUser) {
      setUser(storedUser)
    }
    setIsLoading(false)
  }, [])

  const updateUser = useCallback(
    (newUser: User | null | ((currentUser: User | null) => User | null)) => {
      if (typeof newUser === 'function') {
        setUser((currentUser) => {
          const result = newUser(currentUser)
          result ? saveUserLocalStorage(result) : removeUserLocalStorage()
          return result
        })
      } else {
        setUser(newUser)
        newUser ? saveUserLocalStorage(newUser) : removeUserLocalStorage()
      }
    },
    [],
  )

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
