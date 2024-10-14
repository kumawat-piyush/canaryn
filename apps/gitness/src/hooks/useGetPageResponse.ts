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

export function useGetPageResponse<T>(data: unknown): WithPageResponse<T> {
  const { content, pageResponse } = data as WithPageResponse<T>
  return { content, pageResponse }
}
