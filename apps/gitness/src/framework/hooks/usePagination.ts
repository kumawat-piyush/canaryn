import { useState } from 'react'
import usePageResponseHeaders from '../../hooks/usePageResponseHeaders'

export const usePagination = (responseHeaders: HeadersInit, initialPage: number = 1) => {
  const { xTotalPages: totalPages = 1 } = usePageResponseHeaders(responseHeaders)
  const [currentPage, setCurrentPage] = useState<number>(initialPage)

  const handleClick = (page: number) => {
    setCurrentPage(page)
  }

  const previousPage = () => {
    if (currentPage > 1) {
      handleClick(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      handleClick(currentPage + 1)
    }
  }

  return {
    totalPages,
    currentPage,
    previousPage,
    nextPage,
    handleClick
  }
}
