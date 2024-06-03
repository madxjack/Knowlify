import { ITransaction } from '@/interfaces/transaction'
import { useUser } from '@/hooks/user'
import { useBarter } from '@/hooks/barter'
import { Link } from 'react-router-dom'

interface TrasactionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  transaction: ITransaction
}

export default function TrasactionCard({
  transaction,
  ...props
}: TrasactionCardProps) {
  const { findUserById } = useUser()
  const { findBarterById } = useBarter()

  const requester = findUserById(transaction.requesterId)
  const provider = findUserById(transaction.providerId)
  const barter = findBarterById(transaction.barterId)

  return (
    <div
      {...props}
      className={`flex flex-col w-full max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl ${props.className}`}>
      {/* {transaction.image && (
        <img
          className="w-full h-48 object-cover"
          src={transaction.image}
          alt="Transaction related visual representation"
          loading="lazy"
        />
      )} */}
      <div className='p-5 flex flex-col flex-1 gap-2'>
        <h2 className='text-xl font-semibold text-gray-900'>
          {requester?.name} &rarr; {provider?.name}
        </h2>
        <p className='text-gray-500 flex-1'>
          <span className=''>{barter?.description}</span>
        </p>
        <p className='font-medium text-black'>
          {transaction.credits} créditos.
        </p>
        <p className='text-gray-500 text-sm'>
          Fecha:{' '}
          <span className='font-medium text-black'>
            {new Date(transaction.date).toLocaleDateString()}
          </span>
        </p>
      </div>
      <div className='px-5 py-2 bg-gray-50 flex justify-end items-center'>
        <span className='text-sm  text-orange-700 font-medium py-2 px-4 rounded hover:text-orange-500 '>
          <Link to={`/transaction/${transaction.id}`}>Ver detalles</Link>
        </span>
      </div>
    </div>
  )
}
