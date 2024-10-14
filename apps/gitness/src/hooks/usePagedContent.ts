interface WithPageResponse<T> {
  content: T
  pageResponse: PageResponse
}

interface PageResponse {
  totalItems: number
  totalPages: number
  pageSize: number
  nextPage: number
  previousPage: number
}

export function getPagedContent<T>(data: unknown): WithPageResponse<T> {
  const { content, pageResponse } = data as WithPageResponse<T>
  return { content, pageResponse }
}

export function usePagedContent<T>(data: unknown): WithPageResponse<T> {
  return getPagedContent<T>(data)
}
