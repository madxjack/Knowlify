import { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/auth'
import { Input } from '@/components/ui/input'
import { updateUserBasicInfo } from '@/services/user'
import { User } from '@/interfaces/user'
import { uploadImage } from '@/services/image'

interface ProfileForm {
  id: string
  name: string
  email: string
  image: FileList // Usar FileList para manejar inputs de tipo 'file'
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ProfilePage() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)

  if (!user) {
    return <div>Loading...</div>
  }

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      id: user?.id || '',
      name: user?.name || '',
      email: user?.email || '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  // Observar cambios en el input del archivo para manejar la subida dinámicamente
  const imageFile = watch('image')

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        // Aquí puedes hacer algo con el resultado si necesitas
      }
      fileReader.readAsDataURL(imageFile[0])
    }
  }, [imageFile])

  const onSubmit = async (data: ProfileForm) => {
    setFormError(null)
    let imageUrl

    if (imageFile && imageFile.length > 0) {
      try {
        const uploadResponse = await uploadImage(
          imageFile[0],
          user?.jwtToken as string,
        )
        if (uploadResponse.ok) {
          const { url } = await uploadResponse.json()
          // Actualiza el usuario con la nueva URL de la imagen
          console.log(url)
          imageUrl = url
        } else {
          const errorMessage = await uploadResponse.text()
          setFormError('Error al subir la imagen: ' + errorMessage)
          return
        }
      } catch (error: any) {
        console.log(error)
        setFormError('Error al subir la imagen')
        return
      }
    }

    try {
      const newUserProfile = {
        id: data.id,
        name: data.name,
        email: data.email,
        ProfilePicture: imageUrl,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }

      const updateUserResponse = await updateUserBasicInfo(
        newUserProfile,
        user?.jwtToken as string,
      )
      if (updateUserResponse.ok) {
        const userUpdated: User = {
          ...user,
          imageUrl: imageUrl,
          name: newUserProfile.name,
          email: newUserProfile.email,
        }

        setUser(userUpdated)
        navigate('/dashboard')
      } else {
        const errorMessage = await updateUserResponse.text()
        setFormError('Error al actualizar el perfil: ' + errorMessage)
      }
    } catch (error) {
      setFormError('Error al actualizar el perfil')
    }
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
            htmlFor='image'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Imagen
          </label>
          <div className='flex gap-4'>
            {user.imageUrl && (
              <img
                src={user.imageUrl}
                alt='Imagen del perfil'
                className='w-16 h-16 rounded-full'
              />
            )}
            <Input
              type='file'
              id='image'
              {...register('image')}
              className='self-center block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'
            />
          </div>
          {errors.image && (
            <p className='mt-1 text-sm text-red-600'>{errors.image.message}</p>
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
