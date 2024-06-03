// Asumiendo que esto se coloca en un archivo adecuado, por ejemplo, `review.dto.ts`

export interface IReview {
  id: number
  reviewerId: string
  rating: number
  revieweeId: string
  barterId: number
  comment: string
  date: Date
}
