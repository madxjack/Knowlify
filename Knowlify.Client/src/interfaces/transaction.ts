export interface ITransaction {
  id: number
  requesterId: string
  providerId: string
  barterId: number
  credits: number
  date: string
}

export interface ITransactionRequest {
  requesterId: string
  providerId: string
  barterId: number
  credits: number
}
