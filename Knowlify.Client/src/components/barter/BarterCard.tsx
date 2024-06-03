import { IBarter } from '@/interfaces/barter'
import { Link } from 'react-router-dom'
import { useUser } from '@/hooks/user'
import ImageWithSkeleton from '@/components/img/ImageWithSkeleton'

interface BarterCardProps extends React.HTMLAttributes<HTMLDivElement> {
  barter: IBarter
}

export default function BarterCard({ barter, ...props }: BarterCardProps) {
  const { findUserById } = useUser()
  const offeredByUser = findUserById(barter.offeredById)

  return (
    <div
      {...props}
      className={`${props.className} card w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}>
      <ImageWithSkeleton
        src='/noImage.jpg'
        alt={barter.description}
        className='w-full h-48 object-cover'
      />
      <section className='p-4'>
        <div className='text-xs text-gray-400 space-y-2'>
          <p>{`Skill ID: ${barter.id}`}</p>
        </div>
        <h3 className='text-lg font-bold text-gray-900'>
          {offeredByUser?.name || 'Unknown User'}
        </h3>
        <p className='text-sm text-gray-500'>{barter.description}</p>
        <div className='text-xs text-gray-400 space-y-2'>
          <p>{`Skill ID: ${barter.skillId}`}</p>
          <p>{`Credits: ${barter.credits}`}</p>
          {barter.datePosted && (
            <p>
              {`Posted on: ${new Date(barter.datePosted).toLocaleDateString()}`}
            </p>
          )}
        </div>
        <div className='mt-4'>
          <span className='inline-block text-orange-600 text-sm font-medium py-2 px-4 hover:text-orange-400 transition-colors duration-200'>
            <Link to={`/barter/${barter.id}`}>Ver detalles</Link>
          </span>
        </div>
      </section>
    </div>
  )
}
