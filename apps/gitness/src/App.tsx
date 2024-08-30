import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@harnessio/playground'
import { CodeServiceAPIClient } from '@harnessio/code-service-client'
import { queryClient } from './framework/queryClient'
import PipelineList from './pages/PipelineList'

export default function App() {
  React.useEffect(() => {
    new CodeServiceAPIClient({
      requestInterceptor: (request: Request): Request => {
        const token = localStorage.getItem('token') // Retrieve token from storage
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
        return request
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
