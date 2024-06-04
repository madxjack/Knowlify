import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/auth'
import { IUserRegister } from '@/interfaces/user'
import { useState } from 'react'
import { Textarea } from '../ui/textarea'

export function RegisterForm() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async (user: IUserRegister) => {
    console.log(user)
    try {
      const registered = await register(user)
      if (registered) {
        navigate('/')
        setError(null)
      } else {
        setError('Error al registrar al usuario')
      }
    } catch (error) {
      console.error(error)
      setError(error as string)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')
    const description = formData.get('description')
    const city = formData.get('city')

    const user = {
      name,
      email,
      password,
      description,
      city,
    } as IUserRegister

    handleRegister(user).catch((error) => {
      console.error(error)
    })
  }

  return (
    <Card className='w-full max-w-md'>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className='text-2xl'>Regístrate con Email</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Nombre</Label>
            <Input
              id='name'
              name='name'
              type='text'
              placeholder='Tu nombre completo'
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='ejemplo@m.com'
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Contraseña</Label>
            <Input id='password' name='password' type='password' required />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='description'>Descripción</Label>
            <Textarea
              id='description'
              name='description'
              placeholder='Describe brevemente tus intereses'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='city'>Ciudad</Label>
            <Input
              id='city'
              name='city'
              type='text'
              placeholder='Ciudad de residencia'
            />
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-2'>
          <Button className='w-full'>Registrarse</Button>
          {error && <p className='text-red-500'>{error}</p>}
        </CardFooter>
      </form>
    </Card>
  )
}
