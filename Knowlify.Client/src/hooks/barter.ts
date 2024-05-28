import { getBarters } from '../services/barter'
import { IBarter } from '../interfaces/barter'
import { useState, useEffect, useMemo } from 'react'

export const useBarter = () => {
  const [barters, setBarters] = useState<IBarter[]>([])
  const [error, setError] = useState<Response>()

  const findBarterById = (id: number) => {
    return barters.find((barter) => barter.id === id)
  }

  const findOfferedByUser = (id: string) => {
    return barters.find((barter) => barter.offeredById === id)
  }

  const filterBartersByUserId = (userId: string) => {
    return barters.filter(
      (barter) => barter.offeredById === userId && barter.status !== 'Accepted',
    )
  }

  const lastBarters = (limit = 3 as number) => {
    return useMemo(() => {
      if (barters.length < limit) {
        return barters
      }

      return barters.slice(barters.length - limit, barters.length)
    }, [barters])
  }

  const getAllBartersBySkillId = (skillId: number) => {
    return barters.filter((barter) => barter.skillId === skillId)
  }

  useEffect(() => {
    async function fetchBarters() {
      const response = await getBarters()
      if (response.ok) {
        const barters = (await response.json()) as IBarter[]
        setBarters(barters)
      } else {
        setError(response)
      }
    }

    fetchBarters().catch(console.error)
  }, [])

  return {
    barters,
    findBarterById,
    findOfferedByUser,
    filterBartersByUserId,
    lastBarters,
    getAllBartersBySkillId,
    error,
  }
}
