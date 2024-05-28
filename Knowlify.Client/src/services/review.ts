import { API_ROUTES } from '@/constants/api'
import { IReview } from '@/interfaces/review'

export const getReviews = async () => {
  const response = await fetch(API_ROUTES.review.all)
  const data = (await response.json()) as IReview[]
  return data
}

export const getReview = async (id: number) => {
  const response = await fetch(`${API_ROUTES.review.get}/${id}`)
  const data = (await response.json()) as IReview
  return data
}

export const addReview = async (review: IReview) => {
  const response = await fetch(API_ROUTES.review.add, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  })
  const data = (await response.json()) as IReview
  return data
}

export const updateReview = async (review: IReview) => {
  const response = await fetch(API_ROUTES.review.update, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  })
  const data = (await response.json()) as IReview
  return data
}

export const deleteReview = async (id: number) => {
  const response = await fetch(`${API_ROUTES.review.delete}/${id}`, {
    method: 'DELETE',
  })
  const data = (await response.json()) as IReview
  return data
}

// export const getReviewsByTransaction = async (id: number) => {
//   const response = await fetch(`${API_ROUTES.review.byTransaction}/${id}`)
//   const data = (await response.json()) as IReview[]
//   return data
// }

// export const getReviewsByUser = async (id: number) => {
//   const response = await fetch(`${API_ROUTES.review.byUser}/${id}`)
//   const data = (await response.json()) as IReview[]
//   return data
// }
