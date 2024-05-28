import { getBarter } from '@/services/barter'
import { IBarter } from '@/interfaces/barter'
import { useState, useEffect } from 'react'

export const useBarterDetails = (id: number) => {
  const [barter, setBarter] = useState<IBarter>()
  const [error, setError] = useState<Response>()

  useEffect(() => {
    async function fetchBarter() {
      const response = await getBarter(id)
      if (response.ok) {
        const responseData = (await response.json()) as IBarter
        setBarter(responseData)
      } else {
        setBarter(undefined)
        setError(response)
      }
    }
    fetchBarter().catch(console.error)
  }, [id])

  return { barter, error }
}
