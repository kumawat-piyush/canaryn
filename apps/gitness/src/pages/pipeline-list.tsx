import { useListPipelinesQuery, TypesPipeline } from '@harnessio/code-service-client'
import { PipelineList, Breadcrumbs } from '@harnessio/playground'
import { Topbar } from '@harnessio/canary'
import { useParams } from 'react-router-dom'

export default function Pipelines() {
  const { data: pipelines } = useListPipelinesQuery(
    {
      repo_ref: 'workspace/repo/+',
      queryParams: { page: 0, limit: 10, query: '', latest: true }
    },
    /* To enable mock data */
    {
      placeholderData: { content: [{ identifier: 'pipeline1' }, { identifier: 'pipeline2' }] },
      enabled: true
    }
  )

  const { repoId, executionId } = useParams<{ repoId: string; executionId: string }>()
  const mockItemsData: AvatarItemsProps[] = ['Pixel Point', 'United Bank', 'Code Wizards']
  // Construct breadcrumb items dynamically based on the route parameters
  const breadcrumbItems = [
    repoId && { label: repoId, link: `/repos/${repoId}` },
    executionId && { label: 'Pipelines', link: `/repos/${repoId}/pipelines` }
  ].filter(Boolean) as BreadcrumbItemProps[] // Filter out undefined values and cast to BreadcrumbItemProps[]

  interface AvatarItemsProps {
    items: string[]
  }

  interface BreadcrumbItemProps {
    label: string
    link?: string
    isLast: boolean
    avartarItems: Array<string>
  }

  return (
    <div className="flex flex-col justify-center">
      <Topbar.Root>
        <Topbar.Left>
          <Breadcrumbs isPrimary items={breadcrumbItems} avartarItems={mockItemsData} />
        </Topbar.Left>
        <Topbar.Right>
          <></>
        </Topbar.Right>
      </Topbar.Root>
      <h1>Pipelines</h1>
      <PipelineList
        pipelines={pipelines?.content?.map((item: TypesPipeline) => ({
          id: item?.id,
          success: item?.execution?.status === 'success',
          name: item?.identifier,
          sha: item?.execution?.after,
          description: item?.description,
          timestamp: item?.created
        }))}
      />
    </div>
  )
}
