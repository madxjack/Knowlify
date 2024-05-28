import { useState, useEffect } from 'react'
import { ISkill } from '../interfaces/skill'
import { getSkill } from '@/services/skill'

export const useSkillDetails = (skillId: number) => {
  const [skill, setSkill] = useState<ISkill>()
  const [error, setError] = useState<Response>()

  useEffect(() => {
    async function fetchSkill() {
      const response = await getSkill(skillId)
      if (response.ok) {
        const skill = (await response.json()) as ISkill
        setSkill(skill)
      } else {
        setError(response)
      }
    }

    fetchSkill().catch(console.error)
  }, [skillId])

  return { skill, error }
}
