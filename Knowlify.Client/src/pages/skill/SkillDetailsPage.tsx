import { useParams, useNavigate } from 'react-router-dom'
import { useSkillDetails } from '@/hooks/skillDetails'
import { useBarter } from '@/hooks/barter'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'

export default function SkillDetailsPage() {
  const { id } = useParams()
  const skillId = Number(id)
  const { skill } = useSkillDetails(skillId)
  const { getAllBartersBySkillId } = useBarter()
  const navigate = useNavigate()

  // const handleTrueque = () => {}

  const barters = getAllBartersBySkillId(skillId)

  return (
    <div className='py-10 px-5 md:px-20'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='p-9'>
          <div className='flex gap-4'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2 flex-1 self-center'>
              {skill?.name}
            </h1>
            <div className='max-w-xs'>
              <img
                src={skill?.imageUrl}
                alt='Imagen de la habilidad'
                className='object-cover p-4'
              />
            </div>
          </div>
          <div className='space-y-4'>
            <Detail
              title='ID:'
              content={String(skill?.id) || 'Información no disponible'}
            />
            <Detail
              title='Descripción:'
              content={skill?.description || 'Información no disponible'}
            />
            <Detail
              title='Créditos:'
              content={String(skill?.category) || 'Información no disponible'}
            />
          </div>
        </div>
        <div className='p-5'>
          {barters && barters.length > 0 ? (
            <div className='flex flex-col gap-4 mt-4'>
              <h2 className='text-lg font-semibold text-center'>
                Trueques abiertos
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='text-left'>Descripción</TableHead>
                    <TableHead className='text-center'>Créditos</TableHead>
                    <TableHead className='text-center'>Fecha</TableHead>
                    <TableHead className='text-center'>Ver detalles</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='text-center'>
                  {barters.map((barter) => (
                    <TableRow key={barter.id}>
                      <TableCell className='text-left'>
                        {barter.description}
                      </TableCell>
                      <TableCell>{barter.credits}</TableCell>
                      <TableCell>
                        {barter.datePosted &&
                          new Date(barter.datePosted).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          asChild
                          size='sm'
                          className=''
                          variant='default'>
                          <Link to={`/barter/${barter.id}`}>
                            Ver <ArrowUpRight />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
