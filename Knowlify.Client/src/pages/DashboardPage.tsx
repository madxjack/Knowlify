import { Link } from 'react-router-dom'
import { ArrowUpRight, DollarSign, HandshakeIcon, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTransaction } from '@/hooks/transaction'
import { useAuth } from '@/hooks/auth'
import { useBarter } from '@/hooks/barter'

export default function DashboardPage() {
  const { filterTransactionsByUserId } = useTransaction()
  const { filterBartersByUserId } = useBarter()
  const { user } = useAuth()

  if (!user) return

  const transactionsByUser = filterTransactionsByUserId(user.id)
  const bartersByUser = filterBartersByUserId(user.id)

  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
          <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
            <Card x-chunk='dashboard-01-chunk-0'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Creditos totales
                </CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{user.credits}</div>
              </CardContent>
            </Card>
            <Card x-chunk='dashboard-01-chunk-1'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Trueques abiertos
                </CardTitle>
                <Users className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{bartersByUser.length}</div>
              </CardContent>
            </Card>
            <Card x-chunk='dashboard-01-chunk-2'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Transacciones
                </CardTitle>
                <HandshakeIcon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent className='flex gap-4'>
                <div className='text-2xl font-bold'>
                  {transactionsByUser.length}
                </div>
                <p className='text-xs text-muted-foreground self-center'>
                  En todos los tiempos.
                </p>
              </CardContent>
            </Card>
            <Link
              to='/barter/create'
              className='text-white font-semibold text-center py-4 bg-orange-600 hover:bg-orange-500 transition duration-300 self-center mb-4 shadow-lg rounded-lg'>
              Nuevo trueque +
            </Link>
          </div>
          <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
            {/* Barters card */}
            <Card className='xl:col-span-2' x-chunk='dashboard-01-chunk-4'>
              <CardHeader className='flex flex-row items-center'>
                <div className='grid gap-2'>
                  <CardTitle>Trueques abiertos</CardTitle>
                  <CardDescription>
                    Todos los trueques abiertos.
                  </CardDescription>
                </div>
                <Button asChild size='sm' className='ml-auto gap-1'>
                  <Link to='#'>
                    Ver todos
                    <ArrowUpRight className='h-4 w-4' />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descripción</TableHead>
                      <TableHead className='hidden md:table-cell'>
                        Date
                      </TableHead>
                      <TableHead>Creditos</TableHead>
                      <TableHead className='text-right'>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bartersByUser.map((barter) => (
                      <TableRow key={barter.id}>
                        <TableCell>{barter.description}</TableCell>
                        <TableCell className='hidden md:table-cell'>
                          {new Date(barter.datePosted).toLocaleDateString()}
                        </TableCell>
                        <TableCell className='text-right'>
                          {barter.credits}
                        </TableCell>
                        <TableCell className='text-right'>
                          <Button
                            asChild
                            size='sm'
                            className='ml-auto gap-1 bg-transparent text-muted-foreground hover:text-white'>
                            <Link to={`/barter/${barter.id}`}>
                              Ver
                              <ArrowUpRight className='h-4 w-4' />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            {/* Transactions card */}
            <Card x-chunk='dashboard-01-chunk-5'>
              <CardHeader>
                <CardTitle>Transacciones recientes</CardTitle>
              </CardHeader>
              <CardContent>
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
                    {transactionsByUser.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell
                          className={`${transaction.requesterId === user.id ? 'text-green-500' : 'text-red-500'}`}>
                          {transaction.requesterId === user.id ? '+ ' : '- '}
                          {transaction.credits}
                        </TableCell>
                        <TableCell>
                          <Button
                            asChild
                            size='sm'
                            className='ml-auto gap-1 bg-transparent text-muted-foreground hover:text-white'>
                            <Link to={`/transaction/${transaction.id}`}>
                              Ver
                              <ArrowUpRight className='h-4 w-4' />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  )
}
