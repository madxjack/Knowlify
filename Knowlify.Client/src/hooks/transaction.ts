import { getLastTransactions, getTransactions } from '../services/transaction'
import { ITransaction } from '../interfaces/transaction'
import { useState, useEffect } from 'react'

export const useTransaction = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [lastTransactions, setLastTransactions] = useState<ITransaction[]>([])

  const filterTransactionsById = (id: number) => {
    return transactions.filter((transaction) => transaction.id === id)
  }

  const filterTransactionsByUserId = (id: string) => {
    return transactions.filter(
      (transaction) =>
        transaction.requesterId === id || transaction.providerId === id,
    )
  }

  const findTransactionByBarterId = (id: number) => {
    return transactions.find((transaction) => transaction.barterId === id)
  }

  useEffect(() => {
    getTransactions()
      .then((data) => setTransactions(data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const handleGetLastTransactions = async () => {
      const data = await getLastTransactions()
      data.json().then((data) => setLastTransactions(data))
    }
    handleGetLastTransactions()
  }, [])

  return {
    transactions,
    lastTransactions,
    filterTransactionsById,
    filterTransactionsByUserId,
    findTransactionByBarterId,
  }
}
