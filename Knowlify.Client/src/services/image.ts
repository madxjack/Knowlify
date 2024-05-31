import { API_ROUTES } from '@/constants/api'

export const uploadImage = async (file: File, token: string) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch(API_ROUTES.image.upload, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response
}
