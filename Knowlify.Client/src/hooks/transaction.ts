import { getTransactions } from '../services/transaction'
import { ITransaction } from '../interfaces/transaction'
import { useState, useEffect } from 'react'

export const useTransaction = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  const filterTransactionsById = (id: number) => {
    return transactions.filter((transaction) => transaction.id === id)
  }

  const filterTransactionsByUserId = (id: string) => {
    return transactions.filter(
      (transaction) =>
        transaction.requesterId === id || transaction.providerId === id,
    )
  }

  useEffect(() => {
    getTransactions()
      .then((data) => setTransactions(data))
      .catch((err) => console.log(err))
  }, [])

  return { transactions, filterTransactionsById, filterTransactionsByUserId }
}
