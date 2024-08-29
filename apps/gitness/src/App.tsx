import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@harnessio/playground'
import { CodeServiceAPIClient } from '@harnessio/code-service-client'
import { queryClient } from './framework/queryClient'
import PipelineList from './pages/PipelineList'

export default function App() {
  const temp_token = ''
  const token = localStorage.getItem('token') || temp_token

  React.useEffect(() => {
    new CodeServiceAPIClient({})
  }, [])

  const retHeaders: RequestInit['headers'] = {
    'content-type': 'application/json'
  }
  retHeaders.Authorization = `Bearer ${token}`

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
