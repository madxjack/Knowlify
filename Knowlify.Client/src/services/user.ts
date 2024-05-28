import { API_ROUTES } from '@/constants/api'
import { IUser } from '@/interfaces/user'

export const getUsers = async () => {
  const response = await fetch(API_ROUTES.user.all)
  const data = (await response.json()) as IUser[]
  return data
}

export const getUser = async (id: string) => {
  const response = await fetch(`${API_ROUTES.user.get}/${id}`)
  const data = (await response.json()) as IUser
  return data
}

export const updateUserBasicInfo = async (data: Partial<IUser>) => {
  const response = await fetch(API_ROUTES.user.updateBasicProfileInfo, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}
