import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

export function LoginForm () {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string) => {
    try {
      const loggedIn = await login(email, password)
      if (loggedIn) {
        navigate('/')
      } else {
        setError('Email o contraseña incorrectos')
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    handleLogin(email, password).catch((error) => {
      console.error(error)
    })
  }

  return (
    <Card className='w-full max-w-md'>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className='text-2xl'>Inicio de sesión</CardTitle>
          <CardDescription>
            Introduce tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='m@example.com'
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Contraseña</Label>
            <Input id='password' name='password' type='password' required />
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full'>Sign in</Button>
          {error && <p className='text-red-500'>{error}</p>}
        </CardFooter>
      </form>
    </Card>
  )
}
