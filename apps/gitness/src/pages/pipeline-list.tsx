import { useListPipelinesQuery, TypesPipeline, ListPipelinesOkResponse } from '@harnessio/code-service-client'
import { PipelineList, MeterState } from '@harnessio/playground'
import { ExecutionState } from '../types'

export default function Pipelines() {
  const { data: pipelines } = useListPipelinesQuery(
    {
      repo_ref: 'workspace/repo/+',
      queryParams: { page: 0, limit: 10, query: '', latest: true }
    },
    /* To enable mock data */
    {
      placeholderData: {
        content: [{ identifier: 'pipeline1' }, { identifier: 'pipeline2' }]
      } as any as ListPipelinesOkResponse,
      enabled: true
    }
  )

  return (
    <div className="flex flex-col justify-center">
      <h1>Pipelines</h1>
      <PipelineList
        pipelines={(pipelines as any)?.content?.map((item: TypesPipeline) => ({
          id: item?.id,
          success: item?.execution?.status === ExecutionState.SUCCESS,
          name: item?.identifier,
          sha: item?.execution?.after,
          description: item?.execution?.message,
          timestamp: item?.created,
          meter: [
            {
              id: item?.execution?.number,
              state: item?.execution?.status === ExecutionState.SUCCESS ? MeterState.Success : MeterState.Error
            }
          ]
        }))}
      />
    </div>
  )
}
