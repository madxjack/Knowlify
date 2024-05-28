export interface User {
  id: string
  googleToken?: string
  jwtToken?: string
  email?: string
  name?: string
  description?: string
  city?: string
  credits?: number
}
export interface IUser {
  id: string
  email: string
  name: string
  credits: number
  profilePicture?: string
  description?: string
  city?: string
  skillsOffered: number[]
  skillsWanted: number[]
}

export interface UserProfile {
  name?: string
  picture?: string
}

export interface GoogleUserInfo {
  name?: string
  picture?: string
}

export interface LoginResponse {
  id: string
  jwtToken: string
  email: string
  name: string
  description: string
  city: string
  credits: number
}

export interface IUserRegister {
  name: string
  email: string
  password: string
  description: string
  city: string
}
