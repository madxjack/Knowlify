import { API_ROUTES } from '@/constants/api'
import { IUserRegister } from '@/interfaces/user'
// export const loginWithGoogle = async (googleToken) => {
//   try {
//     const response = await fetch('https://localhost:7273/api/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ googleToken }),
//     })

//     const data = await response.json()

//     if (response.ok) {
//       console.log('Token')
//       console.log(data)
//     }
//   } catch (error) {
//     console.error('Error:', error)
//   }
// }

export const loginWithCredentials = async (email: string, password: string) => {
  const response = await fetch(API_ROUTES.auth.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  return response
}

export const registerUser = async (user: IUserRegister) => {
  const response = await fetch(API_ROUTES.auth.register, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  return response
}
