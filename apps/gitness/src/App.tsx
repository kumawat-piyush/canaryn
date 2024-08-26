// import ExecutionList from '@harnessio/playground'
import { Button } from '@harnessio/canary'
import { useListPipelines } from './services/code'

export default function App() {
  const { data } = useListPipelines({ repo_ref: 'workspace/repo/+' })
  console.log(data)
  return (
    <div className="flex flex-col">
      <Button>Test</Button>
      {/* <ExecutionList /> */}
    </div>
  )
}
