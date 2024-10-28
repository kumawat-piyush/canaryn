import { useState, useEffect } from 'react'

export enum PageResponseHeader {
  xTotal = 'x-total',
  xTotalPages = 'x-total-pages',
  xPerPage = 'x-per-page',
  xNextPage = 'x-next-page',
  xPrevPage = 'x-prev-page'
}

export interface PaginationHeaders {
  total?: number | null
  totalPages?: number | null
  perPage?: number | null
  nextPage?: number | null
  prevPage?: number | null
}

function usePageResponseHeaders(headersInit: HeadersInit): PaginationHeaders {
  const [filteredHeaders, setFilteredHeaders] = useState<PaginationHeaders>({ total: null })

  useEffect(() => {
    const headers = new Headers(headersInit)
    setFilteredHeaders({
      total: parseInt(headers.get(PageResponseHeader.xTotal) || '') || null,
      totalPages: parseInt(headers.get(PageResponseHeader.xTotalPages) || '') || null,
      perPage: parseInt(headers.get(PageResponseHeader.xPerPage) || '') || null,
      nextPage: parseInt(headers.get(PageResponseHeader.xNextPage) || '') || null,
      prevPage: parseInt(headers.get(PageResponseHeader.xPrevPage) || '') || null
    })
  }, [headersInit])

  return filteredHeaders
}

export default usePageResponseHeaders
