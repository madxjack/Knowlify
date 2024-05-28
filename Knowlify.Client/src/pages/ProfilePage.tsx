import { useForm } from 'react-hook-form'
import { useAuth } from '@/hooks/auth'
import { Input } from '@/components/ui/input'
import { updateUserBasicInfo } from '@/services/user'
import { IUser } from '@/interfaces/user'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface ProfileForm {
  id: string
  name: string
  email: string
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ProfilePage() {
  const { user, setUser } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      id: user?.id || '',
      name: user?.name || '',
      email: user?.email || '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: ProfileForm) => {
    setFormError(null)
    const handleUpdateUser = async () => {
      const response = await updateUserBasicInfo(data)
      if (response.ok) {
        const data = (await response.json()) as IUser
        setUser({
          id: data.id,
          email: data.email,
          name: data.name,
        })
        navigate('/dashboard')
      } else {
        setFormError(
          'Error al actualizar el perfil: ' + (await response.text()),
        )
      }
    }
    handleUpdateUser()
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-xl bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-center mb-10'>Editar Perfil</h1>
        <div className='mb-6'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Nombre
          </label>
          <Input
            type='text'
            id='name'
            {...register('name', {
              required: 'El nombre es obligatorio',
              maxLength: {
                value: 50,
                message: 'El nombre debe tener menos de 50 caracteres.',
              },
            })}
            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'
          />
          {errors.name && (
            <p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Email
          </label>
          <Input
            type='email'
            id='email'
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'El email no es válido.',
              },
            })}
            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'
          />
          {errors.email && (
            <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='oldPassword'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Antigua contraseña
          </label>
          <Input
            type='password'
            id='oldPassword'
            {...register('oldPassword', {
              required: 'La contraseña antigua es obligatoria',
              minLength: {
                value: 6,
                message:
                  'La contraseña antigua debe tener al menos 6 caracteres.',
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
                message:
                  'La contraseña debe tener al menos 6 caracteres, debe contener una letra minúscula, una letra mayúscula y un número.',
              },
            })}
            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'
            autoComplete='current-password'
          />
          {errors.oldPassword && (
            <p className='mt-1 text-sm text-red-600'>
              {errors.oldPassword.message}
            </p>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='newPassword'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Nueva contraseña
          </label>
          <Input
            type='password'
            id='newPassword'
            {...register('newPassword', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres.',
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
                message:
                  'La contraseña debe tener al menos 6 caracteres, debe contener una letra minúscula, una letra mayúscula y un número.',
              },
            })}
            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'
            autoComplete='new-password'
          />
          {errors.newPassword && (
            <p className='mt-1 text-sm text-red-600'>
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='confirmPassword'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Confirmar Contraseña
          </label>
          <Input
            type='password'
            id='confirmPassword'
            {...register('confirmPassword', {
              required: 'Confirmar la contraseña es obligatorio',
              validate: (value) =>
                value === getValues('newPassword') ||
                'Las contraseñas no coinciden',
            })}
            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'
            autoComplete='new-password'
          />
          {errors.confirmPassword && (
            <p className='mt-1 text-sm text-red-600'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type='submit'
          className='w-full px-4 py-2 text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm shadow-sm hover:shadow-md transition duration-300'>
          Guardar Cambios
        </button>
        {formError && <p className='mt-1 text-sm text-red-600'>{formError}</p>}
      </form>
    </div>
  )
}
