import { getUsers } from '../services/user'
import { IUser } from '../interfaces/user'
import { useState, useEffect } from 'react'

export const useUser = () => {
  const [users, setUsers] = useState<IUser[]>([])

  const findUserById = (id: string) => {
    return users.find((user) => user.id === id)
  }

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.log(err))
  }, [])

  return { users, findUserById }
}
