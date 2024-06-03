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
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useUser } from '@/hooks/user'
import { ArrowUpRight } from 'lucide-react'

export default function BarterListPage() {
  const { barters } = useBarter()
  const { findUserById } = useUser()

  return (
    <>
      <div className='flex flex-col'>
        <main>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Creditos</TableHead>
                <TableHead>Trueque ofrecido por</TableHead>
                <TableHead>Estado</TableHead>
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
                    <Badge
                      className={`${barter.status === 'Pending' ? 'bg-slate-400' : 'bg-green-500'} text-white`}
                      variant='outline'>
                      {barter.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button asChild size='sm' className='' variant='default'>
                      <Link to={`/barter/${barter.id}`}>
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
    </>
  )
}
