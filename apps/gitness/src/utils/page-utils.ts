export enum PageResponseHeader {
  xTotal = 'x-total',
  xTotalPages = 'x-total-pages',
  xPerPage = 'x-per-page',
  xNextPage = 'x-next-page',
  xPrevPage = 'x-prev-page'
}

export const getPaginationHeaders = (
  headersInit: HeadersInit
): {
  total?: number | null
  totalPages?: number | null
  perPage?: number | null
  nextPage?: number | null
  prevPage?: number | null
} => {
  const headers = new Headers(headersInit)
  return {
    total: parseInt(headers.get(PageResponseHeader.xTotal) || '') || null,
    totalPages: parseInt(headers.get(PageResponseHeader.xTotalPages) || '') || null,
    perPage: parseInt(headers.get(PageResponseHeader.xPerPage) || '') || null,
    nextPage: parseInt(headers.get(PageResponseHeader.xNextPage) || '') || null,
    prevPage: parseInt(headers.get(PageResponseHeader.xPrevPage) || '') || null
  }
}
