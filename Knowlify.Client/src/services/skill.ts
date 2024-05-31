import { ISkill } from '@/interfaces/skill'
import { API_ROUTES } from '@/constants/api'

export const getSkills = async () => {
  const response = await fetch(API_ROUTES.skill.all)
  const data = (await response.json()) as ISkill[]
  return data
}

export const getSkill = async (id: number) => {
  const response = await fetch(`${API_ROUTES.skill.get}/${id}`)
  return response
}

export const addSkill = async (skill: ISkill, jwtToken: string) => {
  const response = await fetch(API_ROUTES.skill.add, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(skill),
  })
  const data = (await response.json()) as ISkill
  return data
}

export const updateSkill = async (skill: ISkill, jwtToken: string) => {
  const response = await fetch(API_ROUTES.skill.update, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(skill),
  })
  const data = (await response.json()) as ISkill
  return data
}

export const deleteSkill = async (id: number, jwtToken: string) => {
  const response = await fetch(`${API_ROUTES.skill.delete}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
  const data = (await response.json()) as ISkill
  return data
}
