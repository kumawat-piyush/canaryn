import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Button } from '@harnessio/canary'
import { PipelineList, ThemeProvider, Pipeline } from '@harnessio/playground'
import { useListPipelines } from './services/code'

export default function App() {
  // const token = localStorage.getItem('token')
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjczMjc4MzUsImlhdCI6MTcyNDczNTgzNSwiaXNzIjoiR2l0bmVzcyIsInBpZCI6MywidGtuIjp7InR5cCI6InNlc3Npb24iLCJpZCI6MTJ9fQ._ucga0wN8jED4Ys-xSouJw4xagaVefeyq4pNdh7eh7Q'
  const retHeaders: RequestInit['headers'] = {
    'content-type': 'application/json'
  }
  retHeaders.Authorization = `Bearer ${token}`

  const { data: pipeline } = useListPipelines({
    base: 'http://localhost:3000/api/v1',
    repo_ref: 'workspace/repo/+',
    requestOptions: { headers: retHeaders },
    queryParams: { page: 0, limit: 10, query: '', latest: true },
    debounce: 500
  })

  console.log(pipeline)

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div className="flex flex-col justify-center">
          <h1>Gitness App</h1>
          <Button>Test</Button>
          <PipelineList
            pipelines={pipeline?.map(
              pipeline =>
                ({
                  description: pipeline?.description || '',
                  id: pipeline?.id || '',
                  name: pipeline?.id || '',
                  sha: pipeline.execution?.after || '',
                  success: pipeline?.execution?.status === 'success',
                  timestamp: pipeline?.updated || '',
                  version: '1'
                }) as Pipeline
            )}
            // pipelines={[]}
          />
        </div>
      )
    }
  ])

  return (
    <ThemeProvider defaultTheme="dark">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
