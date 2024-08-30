import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@harnessio/playground'
import { CodeServiceAPIClient } from '@harnessio/code-service-client'
import { queryClient } from './framework/queryClient'
import PipelineList from './pages/pipeline-list'
import { UI_BASE_URL } from '../app_constants.ts'

export default function App() {
  React.useEffect(() => {
    new CodeServiceAPIClient({
      requestInterceptor: (request: Request): Request => {
        const apiPrefix = 'api/v1/'

        let newUrl = request.url

        // Check if the request URL starts with the base URL
        if (request.url.startsWith(UI_BASE_URL)) {
          // Insert '/api/v1/' after the base URL
          newUrl = request.url.replace(UI_BASE_URL, `${UI_BASE_URL}${apiPrefix}`)
        }

        // Create a new Request object with the updated URL and existing options
        const newRequest = new Request(newUrl, {
          ...request,
          headers: new Headers(request.headers) // Create a new Headers object to modify
        })

        // Retrieve the token from storage
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
