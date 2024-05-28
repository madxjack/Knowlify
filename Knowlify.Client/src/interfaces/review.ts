// Asumiendo que esto se coloca en un archivo adecuado, por ejemplo, `review.dto.ts`

export interface IReview {
  id: number
  reviewerId: string
  rating: number
  revieweeId: string
  comment: string
  date: Date
}
