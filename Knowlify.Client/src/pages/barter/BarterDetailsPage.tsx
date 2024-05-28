import { useParams, useNavigate } from 'react-router-dom'
import { useBarterDetails } from '@/hooks/barterDetails'
import { useUser } from '@/hooks/user'

export default function BarterDetailsPage() {
  const { id } = useParams()
  const barterId = Number(id)
  const { barter, error } = useBarterDetails(barterId)
  const { findUserById } = useUser()
  const navigate = useNavigate()

  if (error) {
    navigate('/error') // Redirect to a more user-friendly error page
  }

  const offeredByUser = findUserById(barter?.offeredById ?? '')

  return (
    <div className='min-h-screen py-10 px-5 md:px-20'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='p-5'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Detalles del Trueque
          </h1>
          <div className='space-y-4'>
            <Detail
              title='Ofrecido por:'
              content={offeredByUser?.name || 'Información no disponible'}
            />
            <Detail
              title='Descripción:'
              content={barter?.description || 'Información no disponible'}
            />
            <Detail
              title='Habilidad:'
              content={String(barter?.skillId) || 'Información no disponible'}
            />
            <Detail
              title='Créditos:'
              content={String(barter?.credits) || 'Información no disponible'}
            />
            <Detail
              title='Fecha:'
              content={
                barter?.datePosted
                  ? new Date(barter.datePosted).toLocaleDateString()
                  : 'Información no disponible'
              }
            />
          </div>
        </div>
        <div className='bg-gray-100 p-5 rounded-b-lg'>
          <button
            onClick={() => navigate(-1)}
            className='text-blue-500 hover:text-blue-700 transition duration-300'>
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}

function Detail({ title, content }: { title: string; content: string }) {
  return (
    <div className='text-gray-800'>
      <h2 className='text-lg font-semibold'>{title}</h2>
      <p className='text-gray-600'>{content}</p>
    </div>
  )
}
