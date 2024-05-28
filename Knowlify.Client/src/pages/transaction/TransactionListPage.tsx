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

export default function TransactionListPage() {
  const { transactions } = useTransaction()

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Creditos</TableHead>
              <TableHead>Acciones</TableHead>
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
                  <Link to={`/transaction/${transaction.id}`}>Ver</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}
