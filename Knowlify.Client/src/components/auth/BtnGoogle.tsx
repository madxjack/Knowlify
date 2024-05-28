import {
  googleLogout,
  useGoogleLogin,
  TokenResponse,
} from '@react-oauth/google'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { GoogleUserInfo } from '@/interfaces/index'

export function BtnGoogle() {
  const { user, setUser } = useAuth()

  const login = useGoogleLogin({
    onSuccess: (tokenResponse: TokenResponse) => {
      console.log(tokenResponse)

      setUser((prevUser) => ({
        ...prevUser,
        googleToken: tokenResponse.access_token,
      }))
      localStorage.setItem('googleToken', tokenResponse.access_token)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    login()
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('googleToken')
    if (accessToken) {
      setUser((prevUser) => ({
        ...prevUser,
        googleToken: accessToken,
      }))
    }
  }, [setUser])

  useEffect(() => {
    if (user?.googleToken) {
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.googleToken}`,
        {
          headers: {
            Authorization: `Bearer ${user.googleToken}`,
            Accept: 'application/json',
          },
        }
      )
        .then((response) => response.json() as Promise<GoogleUserInfo>)
        .then((data) => {
          console.log(data)
          if ('name' in data && 'picture' in data) {
            setUser({
              name: data.name,
            })
          } else {
            console.error('Data fetched does not match UserProfile')
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }, [user, setUser])

  const logOut = () => {
    googleLogout()
    setUser({})
    localStorage.removeItem('access_token')
  }

  return (
    <>
      {user?.name ? (
        <div className="flex gap-3 relative h-full items-center">
          {/* <img className="h-full" src={profile.picture} alt={profile.name} /> */}
          <p>{user.name}</p>
          <button onClick={logOut}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLoginClick}>Login with Google</button>
      )}
    </>
  )
}
