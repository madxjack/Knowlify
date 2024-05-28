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
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Detalles de la transacción</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-lg">Id:</p>
          <p className="text-lg">{transaction?.id}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg">Realizado por:</p>
          <p className="text-lg">{transaction?.providerId}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg">Beneficiario:</p>
          <p className="text-lg">{transaction?.requesterId}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg">Creditos:</p>
          <p className="text-lg">{transaction?.credits}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg">Fecha:</p>
          <p className="text-lg">{transaction?.date}</p>
        </div>
      </div>
    </div>
  )
}
