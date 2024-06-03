import { SearchCodeIcon } from 'lucide-react'
import { useSkill } from '@/hooks/skill'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function SearchCard() {
  const { findSkillBySimilarName } = useSkill()
  const navigate = useNavigate()
  const [noResultMessage, setNoResultMessage] = useState('')

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formdata = new FormData(e.currentTarget)
    const name = formdata.get('name') as string
    const skill = findSkillBySimilarName(name)
    if (skill) {
      navigate(`/skill/${skill.id}`)
    } else {
      setNoResultMessage('No se encontró ninguna habilidad con esa descripción')
    }
  }

  return (
    <div className='flex flex-1 flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-sm border'>
      <header className='text-center'>
        <h1 className='text-lg font-bold text-gray-800'>
          Busca tu nuevo trueque
        </h1>
        <p className='text-sm text-gray-600'>
          Busca tu habilidad y comparte con la gente de todo el mundo
        </p>
      </header>
      <form
        className='w-full flex flex-col items-center gap-2'
        onSubmit={handleOnSubmit}>
        <div className='flex items-center gap-2 w-full'>
          <div className='flex items-center w-full px-4 py-2 border border-gray-200 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2'>
            <input
              name='name'
              type='text'
              placeholder='Buscar habilidad...'
              className='w-full p-2 focus:outline-none'
              aria-label='Buscar habilidad'
            />
            <SearchCodeIcon className='w-5 h-5 text-gray-500' />
          </div>
          <button
            type='submit'
            className='px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500 '
            aria-label='Buscar'>
            Buscar
          </button>
        </div>
      </form>
      {noResultMessage && (
        <div className='w-full flex flex-col items-center gap-2'>
          <div className='text-center'>
            <h2 className='text-lg font-bold text-gray-800'>
              {noResultMessage}
            </h2>
          </div>
        </div>
      )}
    </div>
  )
}
