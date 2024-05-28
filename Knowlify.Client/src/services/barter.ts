import { API_ROUTES } from '@/constants/api'
import { IBarter } from '@/interfaces/barter'

export const getBarters = async () => {
  const response = await fetch(API_ROUTES.barter.all)
  return response
}

export const getBarter = async (id: number) => {
  const response = await fetch(`${API_ROUTES.barter.get}/${id}`)
  return response
}

export const addBarter = async (barter: IBarter) => {
  const response = await fetch(API_ROUTES.barter.add, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(barter),
  })
  return response
}

export const updateBarter = async (barter: IBarter) => {
  const response = await fetch(API_ROUTES.barter.update, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(barter),
  })
  return response
}

export const deleteBarter = async (id: number) => {
  const response = await fetch(`${API_ROUTES.barter.delete}/${id}`, {
    method: 'DELETE',
  })
  return response
}

export const getAllBartersBySkillId = async (skillId: number) => {
  const response = await fetch(
    `${API_ROUTES.barter.GetAllBarterBySkillId}/${skillId}`,
  )
  return response
}
