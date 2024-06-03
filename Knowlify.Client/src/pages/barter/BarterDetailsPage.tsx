import { useParams, useNavigate } from 'react-router-dom'
import { useBarterDetails } from '@/hooks/barterDetails'
import { useUser } from '@/hooks/user'
import { useAuth } from '@/hooks/auth'
import { addTransaction } from '@/services/transaction'
import { deleteBarter } from '@/services/barter'
import { useSkill } from '@/hooks/skill'
import { useReviews } from '@/hooks/review'
import { useTransaction } from '@/hooks/transaction'
import AddReviewForm from '@/components/review/addReviewForm'

export default function BarterDetailsPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const barterId = Number(id)
  const { barter, error } = useBarterDetails(barterId)
  const { findUserById } = useUser()
  const { findSkillById } = useSkill()
  const { findTransactionByBarterId } = useTransaction()
  const { reviews } = useReviews(barterId)
  const navigate = useNavigate()

  if (!barter || !user) {
    return // Redirect to a more user-friendly error page
  }
  if (error) {
    navigate(-1) // Redirect to a more user-friendly error page
  }

  const offeredByUser = findUserById(barter?.offeredById ?? '')
  const skill = findSkillById(barter?.skillId ?? '')

  const handleAcceptBarter = async () => {
    const response = await addTransaction(
      {
        requesterId: barter?.offeredById,
        providerId: user?.id,
        barterId: barter?.id,
        credits: barter?.credits,
      },
      user.jwtToken as string,
    )

    if (response.ok) {
      console.log(await response.json())
      navigate(-1)
    } else {
      console.log(await response.json())
    }
  }

  const handleDeleteBarter = async () => {
    const response = await deleteBarter(barter?.id, user.jwtToken as string)

    if (response.ok) {
      navigate(-1)
    } else {
      console.log(await response.json())
    }
  }

  return (
    <div className='py-10 px-5 md:px-20'>
      <div className='max-w-md mx-auto bg-white shadow-lg shadow-black/40 border-t-2 border-b-orange-500  rounded-lg overflow-hidden'>
        <div className='p-5'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Detalles del Trueque
          </h1>
          <div className='space-y-4'>
            <Detail
              title='Id:'
              content={String(barter?.id) || 'Información no disponible'}
            />
            <Detail
              title='Habilidad:'
              content={String(skill?.name) || 'Información no disponible'}
            />
            <Detail
              title='Ofrecido por:'
              content={offeredByUser?.name || 'Información no disponible'}
              content2={offeredByUser?.email || 'Información no disponible'}
            />
            <Detail
              title='Descripción:'
              content={barter?.description || 'Información no disponible'}
            />
            <Detail
              title='Créditos:'
              content={String(barter?.credits) || 'Información no disponible'}
            />
            <Detail
              title='Estado:'
              content={barter?.status || 'Información no disponible'}
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
          <div className='mt-4'>
            <h2 className='text-lg font-semibold'>Reviews</h2>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <article className='flex flex-col'>
                  <section className='flex gap-2'>
                    <p className='font-semibold'>Autor: </p>
                    <p className='text-gray-600'>
                      {findUserById(review.reviewerId)?.name}
                    </p>
                  </section>
                  <section className='flex gap-2'>
                    <p className='font-semibold'>Fecha de publicación: </p>
                    <p className='text-gray-600'>
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </section>
                  <p className='text-gray-600'>{review.comment}</p>
                </article>
              ))
            ) : (
              <p className='text-gray-600'>No hay reviews</p>
            )}
            {user?.id !== barter.offeredById &&
              user?.id ===
                findTransactionByBarterId(barter?.id)?.providerId && (
                <div className='mt-4'>
                  <AddReviewForm
                    reviewerId={user?.id}
                    barterId={barter?.id}
                    revieweeId={barter?.offeredById}
                  />
                </div>
              )}
          </div>
        </div>
        <div className='flex flex-col gap-4 bg-gray-100 p-5 rounded-b-lg'>
          {user?.id !== barter?.offeredById && barter.status === 'Pending' && (
            <button
              onClick={handleAcceptBarter}
              className='text-white bg-green-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>
              Aceptar
            </button>
          )}
          {user.id === barter?.offeredById && barter.status === 'Pending' && (
            <button
              onClick={handleDeleteBarter}
              className='text-white bg-red-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
              Eliminar
            </button>
          )}
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

function Detail({
  title,
  content,
  content2,
}: {
  title: string
  content: string
  content2?: string
}) {
  return (
    <div className='text-gray-800'>
      <h2 className='text-lg font-semibold'>{title}</h2>
      <p className='text-gray-600'>{content}</p>
      {content2 && <p className='text-gray-600'>{content2}</p>}
    </div>
  )
}
