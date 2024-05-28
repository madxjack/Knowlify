import { API_ROUTES } from '@/constants/api'
import { ITransaction } from '@/interfaces/transaction'

export const getTransactions = async () => {
  const response = await fetch(API_ROUTES.transaction.all)
  const data = (await response.json()) as ITransaction[]
  return data
}

export const getTransaction = async (id: number) => {
  const response = await fetch(`${API_ROUTES.transaction.get}/${id}`)
  return response
}

export const addTransaction = async (transaction: ITransaction) => {
  const response = await fetch(API_ROUTES.transaction.add, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  })
  const data = (await response.json()) as ITransaction
  return data
}

export const updateTransaction = async (transaction: ITransaction) => {
  const response = await fetch(API_ROUTES.transaction.update, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  })
  const data = (await response.json()) as ITransaction
  return data
}

export const deleteTransaction = async (id: number) => {
  const response = await fetch(`${API_ROUTES.transaction.delete}/${id}`, {
    method: 'DELETE',
  })
  const data = (await response.json()) as ITransaction
  return data
}
