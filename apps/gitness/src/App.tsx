import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@harnessio/playground'
import { CodeServiceAPIClient } from '@harnessio/code-service-client'
import { queryClient } from './framework/queryClient'
import PipelineList from './pages/pipeline-list'

export default function App() {
  React.useEffect(() => {
    new CodeServiceAPIClient({
      requestInterceptor: (request: Request): Request => {
        const baseUrl = import.meta.env.UI_BASE_URL || 'http://localhost:5137/'

        let newUrl = request.url

        // Insert '/api/v1/' after the base URL
        if (request.url.startsWith(baseUrl)) {
          newUrl = request.url.replace(baseUrl, `${baseUrl}api/v1/`)
        }

        // Create a new Request object with the updated URL and existing options
        const newRequest = new Request(newUrl, {
          ...request,
          headers: new Headers(request.headers)
        })

        // Retrieve the token from storage and add to headers if available
        const token = localStorage.getItem('token')
        if (token) {
          newRequest.headers.set('Authorization', `Bearer ${token}`)
        }

        return newRequest
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
