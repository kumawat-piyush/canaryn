import React from 'react'
import {
  ListPagination,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@harnessio/canary'
import { usePagination } from '../framework/hooks/usePagination'

interface PaginationProps {
  totalPages?: number
}

export const PageControls: React.FC<PaginationProps> = ({ totalPages = 1 }) => {
  const { currentPage, previousPage, nextPage, handleClick } = usePagination(1, totalPages)
  return (
    <ListPagination.Root>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              size="sm"
              href="#"
              onClick={() => currentPage > 1 && previousPage()}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === index + 1}
                size="sm_icon"
                href="#"
                onClick={() => handleClick(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              size="sm"
              href="#"
              onClick={() => currentPage < totalPages && nextPage()}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </ListPagination.Root>
  )
}
