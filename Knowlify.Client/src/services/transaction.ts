import { API_ROUTES } from '@/constants/api'
import { ITransactionRequest, ITransaction } from '@/interfaces/transaction'

export const getTransactions = async () => {
  const response = await fetch(API_ROUTES.transaction.all)
  const data = (await response.json()) as ITransaction[]
  return data
}

export const getTransaction = async (id: number) => {
  const response = await fetch(`${API_ROUTES.transaction.get}/${id}`)
  return response
}

export const addTransaction = async (
  transaction: ITransactionRequest,
  token: string,
) => {
  if (token === '') {
    throw new Error('No token provided')
  }
  const response = await fetch(API_ROUTES.transaction.add, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(transaction),
  })
  return response
}

export const updateTransaction = async (
  transaction: ITransaction,
  token: string,
) => {
  if (token === '') {
    throw new Error('No token provided')
  }
  const response = await fetch(API_ROUTES.transaction.update, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(transaction),
  })
  const data = (await response.json()) as ITransaction
  return data
}

export const deleteTransaction = async (id: number, token: string) => {
  if (token === '') {
    throw new Error('No token provided')
  }
  const response = await fetch(`${API_ROUTES.transaction.delete}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = (await response.json()) as ITransaction
  return data
}

export const getLastTransactions = async () => {
  const response = await fetch(API_ROUTES.transaction.last)
  return response
}
