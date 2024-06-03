import { API_ROUTES } from '@/constants/api'
import { IReview } from '@/interfaces/review'

export const getReviews = async () => {
  const response = await fetch(API_ROUTES.review.all)
  return response
}

export const getReview = async (id: number) => {
  const response = await fetch(`${API_ROUTES.review.get}/${id}`)
  return response
}

export const getReviewsByBarter = async (barterId: number) => {
  const response = await fetch(`${API_ROUTES.review.ByBarterId}/${barterId}`)
  return response
}

export const addReview = async (review: IReview, token: string) => {
  if (token === '') {
    throw new Error('No token provided')
  }
  const response = await fetch(API_ROUTES.review.add, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(review),
  })
  return response
}

export const updateReview = async (review: IReview, token: string) => {
  if (token === '') {
    throw new Error('No token provided')
  }
  const response = await fetch(API_ROUTES.review.update, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(review),
  })
  return response
}

export const deleteReview = async (id: number, token: string) => {
  if (token === '') {
    throw new Error('No token provided')
  }
  const response = await fetch(`${API_ROUTES.review.delete}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response
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
