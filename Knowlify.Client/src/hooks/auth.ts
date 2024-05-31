// src/hooks/useAuth.ts
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { loginWithCredentials, registerUser } from '@/services/authService'
import { User, IUserRegister, LoginResponse } from '@/interfaces/user'

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  const { user, setUser, isLoading } = authContext

  const login = async (email: string, password: string) => {
    const response = await loginWithCredentials(email, password)
    if (response.ok) {
      const data = (await response.json()) as LoginResponse
      console.log(data)
      setUser({
        id: data.id,
        jwtToken: data.jwtToken,
        email: data.email,
        name: data.name,
        description: data.description,
        imageUrl: data.profilePicture,
        city: data.city,
        credits: data.credits,
      })
      return true
    } else {
      return false
    }
  }

  const logout = () => {
    setUser(null)
  }

  const register = async (user: IUserRegister) => {
    const response = await registerUser(user)
    if (response.ok) {
      const data = (await response.json()) as User
      setUser({
        id: data.id,
        jwtToken: data.jwtToken,
        email: data.email,
        name: data.name,
        description: data.description,
        city: data.city,
        credits: data.credits,
      })
      return true
    }
    return false
  }

  return {
    user,
    setUser,
    isLoading,
    login,
    logout,
    register,
  }
}
