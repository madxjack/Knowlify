export interface IBarter {
  id: number
  offeredById: string
  skillId: number
  description: string
  status: string
  credits: number
  imageUrl?: string
  transactionId?: number
  datePosted?: string
}
