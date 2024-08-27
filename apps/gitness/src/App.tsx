// import ExecutionList from '@harnessio/playground'
import { Button } from '@harnessio/canary'
import { useListPipelines } from './services/code'

export default function App() {
  const retHeaders: RequestInit['headers'] = {
    'content-type': 'application/json'
  }
  const token = localStorage.getItem('token')
  if (token && token.length > 0) {
    retHeaders.Authorization = `Bearer ${token}`
  }
  useListPipelines({ repo_ref: 'workspace/repo/+', requestOptions: { headers: retHeaders } })
  return (
    <div className="flex flex-col">
      <Button>Test</Button>
      {/* <ExecutionList /> */}
    </div>
  )
}
