import { useParams, useNavigate } from 'react-router-dom'
import { useSkillDetails } from '@/hooks/skillDetails'
import { useBarter } from '@/hooks/barter'
import { useAuth } from '@/hooks/auth'

export default function SkillDetailsPage() {
  const { id } = useParams()
  const skillId = Number(id)
  const { skill, error } = useSkillDetails(skillId)
  const { getAllBartersBySkillId } = useBarter()
  const navigate = useNavigate()
  const { user } = useAuth()

  if (error) {
    navigate('/error') // Redirect to a more user-friendly error page
  }

  const handleTrueque = () => {}

  const barters = getAllBartersBySkillId(skillId)

  return (
    <div className='min-h-screen py-10 px-5 md:px-20'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='p-5'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Detalles de la habilidad
          </h1>
          <div className='space-y-4'>
            <Detail
              title='Descripción:'
              content={skill?.description || 'Información no disponible'}
            />
            <Detail
              title='Habilidad:'
              content={String(skill?.id) || 'Información no disponible'}
            />
            <Detail
              title='Créditos:'
              content={String(skill?.category) || 'Información no disponible'}
            />
          </div>
        </div>
        <div>
          {barters && barters.length > 0 ? (
            <div className='flex flex-col gap-4 mt-4'>
              <h2 className='text-lg font-semibold text-center'>
                Trueques abiertos
              </h2>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th>Créditos</th>
                    <th>Fecha</th>
                    <th>Ver detalles</th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {barters.map((barter) => (
                    <tr key={barter.id}>
                      <td>{barter.description}</td>
                      <td>{barter.credits}</td>
                      <td>
                        {new Date(barter.datePosted).toLocaleDateString()}
                      </td>
                      <td>
                        <span className='inline-block text-sm font-medium py-2 px-4 hover:text-orange-400 transition-colors duration-200'>
                          Ver
                        </span>
                        {user && (
                          <button className='ml-2'>
                            <span className='inline-block text-green-600 text-sm font-medium py-2 px-4 hover:text-green-800 transition-colors duration-200'>
                              Trueque
                            </span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className='text-center'>No hay trueques abiertos</p>
          )}
        </div>
        <div className='bg-gray-100 p-5 rounded-b-lg'>
          <button
            onClick={() => navigate(-1)}
            className='text-blue-500 hover:text-blue-700 transition duration-300'>
            Volver
          </button>
        </div>
      </div>
    </div>
  )

  function Detail({ title, content }: { title: string; content: string }) {
    return (
      <div className='text-gray-800'>
        <h2 className='text-lg font-semibold'>{title}</h2>
        <p className='text-gray-600'>{content}</p>
      </div>
    )
  }
}
