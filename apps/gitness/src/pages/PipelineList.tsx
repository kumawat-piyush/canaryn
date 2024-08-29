import { Button } from '@harnessio/canary'
// import { Pipeline, PipelineList } from '@harnessio/playground'
import { useListPipelinesQuery, TypesPipeline } from '@harnessio/code-service-client'

export default function Pipelines() {
  const { data: pipelines } = useListPipelinesQuery(
    {
      repo_ref: 'workspace/repo/+',
      queryParams: { page: 0, limit: 10, query: '', latest: true }
    },
    /* To enable mock data */
    {
      placeholderData: [{ name: 'test pipeline' }],
      enabled: false
    }
  )

  return (
    <div className="flex flex-col justify-center">
      <h1>Gitness App</h1>
      <Button>Test</Button>
      {pipelines?.map((pipeline: TypesPipeline) => <div>{pipeline.id}</div>)}
    </div>
  )
}
