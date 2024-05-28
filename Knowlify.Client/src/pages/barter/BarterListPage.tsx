import { Link } from 'react-router-dom'
import { useBarter } from '@/hooks/barter'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUser } from '@/hooks/user'

export default function BarterListPage() {
  const { barters } = useBarter()
  const { findUserById } = useUser()

  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <main>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Creditos</TableHead>
                <TableHead>Trueque ofrecido por</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {barters.map((barter) => (
                <TableRow key={barter.id}>
                  <TableCell>{barter.id}</TableCell>
                  <TableCell>{barter.description}</TableCell>
                  <TableCell>{barter.credits}</TableCell>
                  <TableCell>
                    {findUserById(barter.offeredById)?.email ||
                      'Email no disponible'}
                  </TableCell>
                  <TableCell>
                    <Link to={`/barter/${barter.id}`}>Ver</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      </div>
    </>
  )
}
