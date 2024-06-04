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
import { useState } from 'react'
import PaginationFooter from '@/components/footer/PaginationFooter'

export default function BarterListPage() {
  const { barters } = useBarter()
  const { findUserById } = useUser()
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 15

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div className='flex flex-col'>
        <main>
          <h1 className='text-3xl mb-4 font-semibold text-center'>
            Lista de Trueques
          </h1>
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
              {barters
                .slice(
                  (currentPage - 1) * rowsPerPage,
                  currentPage * rowsPerPage,
                )
                .map((barter) => (
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
          <div className='flex flex-1 justify-center'>
            <PaginationFooter
              currentPage={currentPage}
              totalRows={barters.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
            />
          </div>
        </main>
      </div>
    </>
  )
}
