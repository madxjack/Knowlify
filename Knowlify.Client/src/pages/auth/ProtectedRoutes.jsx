import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/auth'

const ProtectedRoutes = () => {
  const { user, isLoading } = useAuth()
  console.log('user', user)
  console.log('isLoading', isLoading)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return user ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes
