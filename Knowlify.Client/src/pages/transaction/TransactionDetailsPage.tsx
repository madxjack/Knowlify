import { useParams, useNavigate } from 'react-router-dom'
import { useTransactionDetails } from '@/hooks/transactionDetails'

export default function TransactionDetailsPage() {
  const { id } = useParams()
  const transactionId = Number(id)
  const { transaction, error } = useTransactionDetails(transactionId)
  const navigate = useNavigate()

  if (error) {
    navigate(-1)
  }

  return (
    <div className='py-10 px-5 md:px-20'>
      <div className='max-w-md mx-auto bg-white shadow-lg shadow-black/40 border-t-2 border-b-orange-500  rounded-lg overflow-hidden'>
        <div className='p-5'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Detalles de la transacción
          </h1>
          <div className='space-y-4'>
            <Detail
              title='Id:'
              content={String(transaction?.id) || 'Información no disponible'}
            />
            <Detail
              title='Creado por:'
              content={
                String(transaction?.requesterId) || 'Información no disponible'
              }
            />
            <Detail
              title='Realizado por:'
              content={
                String(transaction?.providerId) || 'Información no disponible'
              }
            />
            <Detail
              title='Fecha de creación:'
              content={
                transaction?.date
                  ? new Date(transaction.date).toLocaleDateString()
                  : 'Información no disponible'
              }
            />
            <Detail
              title='Créditos:'
              content={
                String(transaction?.credits) || 'Información no disponible'
              }
            />
          </div>
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
