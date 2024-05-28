import { getTransaction } from '@/services/transaction'
import { ITransaction } from '@/interfaces/transaction'
import { useState, useEffect } from 'react'

export const useTransactionDetails = (id: number) => {
  const [transaction, setTransaction] = useState<ITransaction>()
  const [error, setError] = useState<Response>()

  useEffect(() => {
    async function fetchTransaction() {
      const response = await getTransaction(id)
      if (response.ok) {
        const responseData = (await response.json()) as ITransaction
        setTransaction(responseData)
      } else {
        setTransaction(undefined)
        setError(response)
      }
    }
    fetchTransaction().catch(console.error)
  }, [id])

  return { transaction, error }
}
