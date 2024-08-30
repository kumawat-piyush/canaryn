import { useListPipelinesQuery, TypesPipeline } from '@harnessio/code-service-client'

export default function Pipelines() {
  const { data: pipelines } = useListPipelinesQuery(
    {
      repo_ref: 'workspace/repo/+',
      queryParams: { page: 0, limit: 10, query: '', latest: true }
    },
    /* To enable mock data */
    {
      placeholderData: [{ identifier: 'pipeline1' }, { identifier: 'pipeline2' }],
      enabled: true
    }
  )

  return (
    <div className="flex flex-col justify-center">
      <h1>Pipelines</h1>
      {pipelines?.map((pipeline: TypesPipeline) => <div key={pipeline.id}>{pipeline.id}</div>)}
    </div>
  )
}
