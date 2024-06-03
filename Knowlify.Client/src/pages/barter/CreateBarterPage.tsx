import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/auth'
import { useSkill } from '@/hooks/skill'
import { addBarter } from '@/services/barter'
import { useEffect, useState } from 'react'
import { uploadImage } from '@/services/image'

interface CreateBarterForm {
  offeredById: string
  description: string
  skillId: number
  credits: number
  status: string
  imageUrl: FileList // Usar FileList para manejar inputs de tipo 'file'
}

export default function CreateBarterPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { skills } = useSkill()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  if (!user) {
    return <div>Loading...</div>
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateBarterForm>({
    defaultValues: {
      offeredById: user?.id,
      description: '',
      skillId: 0,
      credits: 0,
      status: 'Pending',
    },
  })

  const imageFile = watch('imageUrl')

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(imageFile[0])
    }
  }, [imageFile])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: CreateBarterForm) => {
    // navigate('/dashboard')
    setFormError(null)
    let imageUrl

    if (selectedImage) {
      try {
        const uploadResponse = await uploadImage(
          selectedImage,
          user?.jwtToken as string,
        )
        if (uploadResponse.ok) {
          const { url } = await uploadResponse.json()
          // Actualiza el usuario con la nueva URL de la imagen
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
      const newBarter = {
        ...data,
        credits: Number(data.credits),
        imageUrl: imageUrl,
      }

      addBarter(newBarter, user?.jwtToken as string)
        .then((response) => {
          if (response.ok) {
            navigate('/dashboard')
          }
        })
        .catch((error) => {
          console.log(error)
          setFormError('Error al crear el barter')
        })
    } catch (error) {
      setFormError('Error al crear el barter')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-4xl mx-auto p-4'>
      <header>
        <h1 className='text-3xl font-bold mb-4'>Crear un nuevo trueque</h1>
      </header>

      <div className='flex gap-4 items-center'>
        <Label htmlFor='offeredById'>Trueque ofrecido por:</Label>
        <p className='text-sm text-muted-foreground'>
          {user?.email || 'Unknown User'}
        </p>
      </div>
      <Input
        className='hidden text-muted-foreground focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'
        type='text'
        id='offeredById'
        {...register('offeredById')}
        hidden
      />
      {errors.offeredById && (
        <p className='text-red-500'>{errors.offeredById.message}</p>
      )}
      <section>
        <Label htmlFor='description'>Descripción</Label>
        <Textarea
          id='description'
          {...register('description', {
            required: 'La descripción no puede estar vacía.',
            maxLength: {
              value: 100,
              message: 'La descripción debe tener menos de 100 caracteres.',
            },
          })}
          className='focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'
        />
        {errors.description && (
          <p className='text-red-500'>{errors.description.message}</p>
        )}
      </section>
      <div className='grid sm:flex gap-4'>
        <div className='grid sm:flex-1 gap-2'>
          <div className='flex gap-6'>
            <section>
              <Label htmlFor='skillId'>Habilidad requerida</Label>
              <select
                {...register('skillId', {
                  required: 'Debes seleccionar una habilidad',
                  validate: (value) => {
                    if (value === 0) {
                      return 'Debes seleccionar una habilidad'
                    }
                    return true
                  },
                })}
                className='w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm text-gray-700 focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'>
                <option value=''>Selecciona una habilidad</option>
                {skills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
              {errors.skillId && (
                <p className='text-red-500'>{errors.skillId.message}</p>
              )}
            </section>
            <section>
              <Label htmlFor='credits'>Créditos</Label>
              <Input
                type='number'
                id='credits'
                {...register('credits', {
                  required: 'Los créditos son obligatorios',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Debes ingresar un número mayor entero.',
                  },
                  validate: (value) => {
                    const userCredits = user?.credits ?? 0
                    return (
                      value <= userCredits ||
                      `Los créditos no pueden ser mayores que tu credito actual (${userCredits})`
                    )
                  },
                })}
                className='focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'
              />
              {errors.credits && (
                <p className='text-red-500'>{errors.credits.message}</p>
              )}
            </section>
          </div>
          <section>
            <Input
              hidden
              className='hidden'
              type='text'
              id='status'
              {...register('status')}
            />
          </section>
          <section className='flex gap-4 items-center'>
            <Label htmlFor='imageUrl'>Imagen</Label>
            <Input
              type='file'
              id='imageUrl'
              {...register('imageUrl', {
                required: 'Debes seleccionar una imagen',
                validate: (value) => {
                  if (value === null) {
                    return 'Debes seleccionar una imagen'
                  }
                  return true
                },
              })}
              className='focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'
              onChange={handleImageChange}
            />
          </section>
          {errors.imageUrl && (
            <p className='text-red-500'>{errors.imageUrl.message}</p>
          )}
        </div>
        <div className='w-2/3 sm:w-1/3 sm:flex-shrink-0 '>
          {imagePreview && (
            <img
              src={imagePreview}
              alt='Imagen'
              className='w-full h-full rounded-md object-contain p-1'
            />
          )}
        </div>
      </div>

      <div className='mt-6'>
        <Button type='submit'>Crear</Button>
        {formError && <p className='text-red-500'>{formError}</p>}
      </div>
    </form>
  )
}
