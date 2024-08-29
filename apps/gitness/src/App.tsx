import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { set } from 'lodash-es'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@harnessio/playground'
import { CodeServiceAPIClient } from '@harnessio/code-service-client'
import { queryClient } from './framework/queryClient'
import PipelineList from './pages/PipelineList'
import { generateHeaders } from './utils/RequestUtils'

export default function App() {
  React.useEffect(() => {
    new CodeServiceAPIClient({
      requestInterceptor: (request: Request) => {
        return set(request, 'headers', generateHeaders(request.headers))
      }
    })
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <PipelineList />
    }
  ])

  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
