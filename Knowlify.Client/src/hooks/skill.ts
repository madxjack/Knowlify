import { getSkills } from '../services/skill'
import { ISkill } from '../interfaces/skill'
import { useState, useEffect } from 'react'

export const useSkill = () => {
  const [skills, setSkills] = useState<ISkill[]>([])

  const findSkillById = (id: number) => {
    return skills.find((skill) => skill.id === id)
  }

  // const lastSkills = (limit = 3 as number) => {
  //   return useMemo(() => {
  //     if (skills.length < limit) {
  //       return skills
  //     }

  //     return skills.slice(skills.length - limit, skills.length)
  //   }, [skills])
  // }
  const lastSkills = (limit = 3 as number) => {
    return skills.slice(skills.length - limit, skills.length)
  }

  const findSkillBySimilarName = (name: string) => {
    return skills.find((skill) =>
      skill.name.toLowerCase().includes(name.toLowerCase()),
    )
  }

  useEffect(() => {
    getSkills()
      .then((data) => setSkills(data))
      .catch((err) => console.log(err))
  }, [])

  return { skills, findSkillById, lastSkills, findSkillBySimilarName }
}
