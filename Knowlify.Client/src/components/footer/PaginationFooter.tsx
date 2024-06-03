/* eslint-disable no-unused-vars */
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react'

interface PaginationFooterProps {
  currentPage: number
  totalRows: number
  rowsPerPage: number
  onPageChange: (page: number) => void
}

const PaginationFooter = ({
  currentPage,
  totalRows,
  rowsPerPage,
  onPageChange,
}: PaginationFooterProps) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage)

  return (
    <div className='flex gap-2'>
      <button
        className={currentPage === 1 ? 'hidden' : ''}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        <SquareChevronLeft className='text-muted-foreground' />
      </button>
      <div>
        Página {currentPage} de {totalPages === 0 ? 1 : totalPages}
      </div>
      <button
        className={currentPage === totalPages ? 'hidden' : ''}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <SquareChevronRight className='text-muted-foreground' />
      </button>
    </div>
  )
}

export default PaginationFooter
