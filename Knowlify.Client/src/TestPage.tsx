import { useEffect } from 'react'
import { getSkills, getSkill } from './services/skill'

export default function TestPage() {
  useEffect(() => {
    getSkills()
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    getSkill(1)
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>Test Page</h1>
      <p className='text-lg'>This is a test page to test the API endpoints.</p>
    </div>
  )
}
