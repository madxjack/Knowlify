import { getReviews, getReviewsByBarter } from '@/services/review'
import { IReview } from '@/interfaces/review'
import { useState, useEffect } from 'react'

export const useReviews = (barterId: number) => {
  const [reviews, setReviews] = useState<IReview[]>([])

  const findReviewById = (id: number) => {
    return reviews.find((review) => review.id === id)
  }

  const lastReviews = (limit = 3 as number) => {
    return reviews.slice(reviews.length - limit, reviews.length)
  }

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getReviewsByBarter(barterId)
      if (reviews.ok) {
        setReviews(await reviews.json())
      } else {
        console.log(reviews)
      }
    }
    fetchReviews()
  }, [])

  return { reviews, findReviewById, lastReviews }
}
