import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/auth'
import { useSkill } from '@/hooks/skill'
import { addBarter } from '@/services/barter'

export default function CreateBarterPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { skills } = useSkill()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      offeredById: user?.id,
      description: '',
      skillId: '',
      credits: 0,
      status: 'Pending',
    },
  })

  const onSubmit = (data: any) => {
    // navigate('/dashboard')
    addBarter(data).then((response) => {
      if (response.ok) {
        navigate('/dashboard')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-4xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Crear un nuevo trueque</h1>
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
      <div className='flex gap-6'>
        <section>
          <Label htmlFor='skillId'>Habilidad requerida</Label>
          <select
            {...register('skillId', {
              required: 'Debes seleccionar una habilidad',
              validate: (value) => {
                if (value === '') {
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
            })}
            className='focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-orange-500 focus-visible:ring-offset-0'
          />
          {errors.credits && (
            <p className='text-red-500'>{errors.credits.message}</p>
          )}
        </section>
        <section>
          <Input
            hidden
            className='hidden'
            type='text'
            id='status'
            {...register('status')}
          />
        </section>
      </div>

      <div className='mt-6'>
        <Button type='submit'>Crear</Button>
      </div>
    </form>
  )
}
