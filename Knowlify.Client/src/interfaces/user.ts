//Generic User Interface
export interface User {
  id: string
  jwtToken?: string
  email?: string
  name?: string
  description?: string
  imageUrl?: string
  city?: string
  credits?: number
}

// Main user interface
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
  profilePicture?: string
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
