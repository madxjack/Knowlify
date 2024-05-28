import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { LoginResponse } from '@/interfaces'

export function BtnSignIn() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const logOut = () => {
    localStorage.removeItem('jwtToken')
    setUser(null)
  }

  useEffect(() => {
    const userResponse = localStorage.getItem('user')
    if (userResponse) {
      setUser(JSON.parse(userResponse) as LoginResponse)
    }
  }, [setUser])

  return (
    <>
      {user ? (
        <div className="flex gap-2 text-white">
          <p className="content-center">{user?.name}</p>
          <Button onClick={logOut}>Sign Out</Button>
        </div>
      ) : (
        <Button onClick={handleLoginClick}>Sign In</Button>
      )}
    </>
  )
}
