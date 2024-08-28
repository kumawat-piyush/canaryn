import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Button } from '@harnessio/canary'
import { PipelineList, ThemeProvider, Pipeline } from '@harnessio/playground'
import { useListPipelinesQuery, TypesPipeline } from '@harnessio/code-service-client'
import useOpenApiClients from './framework/hooks/useOpenAPIClients'
// import { useListPipelines } from './services/code'

export default function App() {
  const temp_token = ''
  const token = localStorage.getItem('token') || temp_token

  const globalResponseHandler = () => {}
  useOpenApiClients(globalResponseHandler, '')

  const retHeaders: RequestInit['headers'] = {
    'content-type': 'application/json'
  }
  retHeaders.Authorization = `Bearer ${token}`

  // const { data: pipeline } = useListPipelines({
  //   base: 'http://localhost:3000/api/v1',
  //   repo_ref: 'workspace/repo/+',
  //   requestOptions: { headers: retHeaders },
  //   queryParams: { page: 0, limit: 10, query: '', latest: true },
  //   debounce: 500
  // })

  const { data: pipeline } = useListPipelinesQuery({
    repo_ref: 'workspace/repo/+',
    queryParams: { page: 0, limit: 10, query: '', latest: true }
  })

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div className="flex flex-col justify-center">
          <h1>Gitness App</h1>
          <Button>Test</Button>
          <PipelineList
            pipelines={pipeline?.map(
              (pipeline: TypesPipeline) =>
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
