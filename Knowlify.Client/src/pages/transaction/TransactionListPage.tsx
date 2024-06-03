import { Link } from 'react-router-dom'
import { useTransaction } from '@/hooks/transaction'
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

export default function TransactionListPage() {
  const { transactions } = useTransaction()

  return (
    <div className='flex flex-col text-center'>
      <main>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Id</TableHead>
              <TableHead className='text-center'>Fecha</TableHead>
              <TableHead className='text-center'>Creditos</TableHead>
              <TableHead className='text-center'>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.credits}</TableCell>
                <TableCell>
                  <Button asChild size='sm' className='' variant='default'>
                    <Link to={`/transaction/${transaction.id}`}>
                      Ver <ArrowUpRight />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}
