import { useForm } from 'react-hook-form'
import { IReview } from '@/interfaces/review'
import { Button } from '../ui/button'
import { addReview } from '@/services/review'
import { useAuth } from '@/hooks/auth'

interface AddReviewFormProps {
  reviewerId: string
  revieweeId: string
  barterId: number
}

export default function AddReviewForm({
  reviewerId,
  barterId,
  revieweeId,
}: AddReviewFormProps) {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReview>({
    defaultValues: {
      reviewerId,
      barterId,
      revieweeId,
      comment: '',
      rating: 5,
    },
  })

  const onSubmit = async (data: IReview) => {
    console.log(data)
    const response = await addReview(data, user?.jwtToken as string)

    if (response.ok) {
      console.log('ok')
    } else {
      console.log('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-4xl mx-auto'>
      <header>
        <h1 className='text-xl font-bold'>Añadir una nueva review</h1>
      </header>

      <section>
        <input {...register('reviewerId')} type='text' id='reviewerId' hidden />
        <input {...register('revieweeId')} type='text' id='revieweeId' hidden />
      </section>
      <section>
        <input
          {...register('barterId')}
          className='focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'
          type='number'
          id='barterId'
          hidden
        />
      </section>
      <section className='flex flex-col'>
        <label htmlFor='comment' className='block text-sm font-medium'>
          Comentario
        </label>
        <textarea
          {...register('comment', {
            required: 'El comentario no puede estar vacío',
            maxLength: {
              value: 100,
              message: 'El comentario debe tener menos de 100 caracteres.',
            },
          })}
          className='border focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'
          id='comment'
          placeholder='Deja tu review de como ha ido el trueque.'
        />
        {errors.comment && (
          <p className='text-red-500'>{errors.comment.message}</p>
        )}
      </section>
      <section>
        <label htmlFor='rating' className='block text-sm font-medium'>
          Valoración
        </label>
        <input
          {...register('rating', {
            required: 'La valoración no puede estar vacía',
            min: {
              value: 1,
              message: 'La valoración debe ser mayor o igual a 1',
            },
            max: {
              value: 5,
              message: 'La valoración debe ser menor o igual a 5',
            },
          })}
          className='border focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'
          id='rating'
          type='number'
          placeholder='5'
        />
      </section>
      <div className='mt-6'>
        <Button type='submit' variant='outline' className='w-full'>
          Añadir
        </Button>
      </div>
    </form>
  )
}
