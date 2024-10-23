import React from 'react'
import { Link } from 'react-router-dom'
import { Spacer, Button, Text } from '@harnessio/canary'
// import { NoSearchResults } from '../components/no-search-results'
import { Filter, NoData, SandboxLayout, SkeletonList, useCommonFilter, WebhooksList } from '@harnessio/playground'
import { useListWebhooksQuery } from '@harnessio/code-service-client'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { PageControls } from '../../components/Pagination'
function RepoSandboxWebhooksListPage() {
  // lack of data: total commits
  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>
  const repoRef = useGetRepoRef()

  const { query } = useCommonFilter()

  const { data: webhooks, isFetching } = useListWebhooksQuery({
    repo_ref: repoRef,
    queryParams: { order: 'asc', limit: 20, page: 1, query }
  })

  const renderListContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    if (webhooks?.content?.length) {
      return <WebhooksList webhooks={webhooks?.content} LinkComponent={LinkComponent} />
    } else {
      return (
        <NoData
          insideTabView
          iconName="no-data-webhooks"
          title="No webhooks yet"
          description={['There are no webhooks in this repository yet.', 'Create new or import an existing webhook.']}
          primaryButton={{ label: 'Create webhook' }}
          secondaryButton={{ label: 'Import webhook' }}
        />
      )
    }
  }

  return (
    <>
      <SandboxLayout.Main hasHeader hasLeftPanel>
        <SandboxLayout.Content>
          <Spacer size={10} />
          <Text size={5} weight={'medium'}>
            Webhooks
          </Text>
          <Spacer size={6} />

          <div className="flex justify-between gap-5 items-center">
            <div className="flex-1">
              <Filter />
            </div>
            <Button variant="default" asChild>
              <Link to="#">Create webhook</Link>
            </Button>
          </div>

          <Spacer size={5} />
          {renderListContent()}
          <Spacer size={8} />
          {(webhooks?.content?.length ?? 0) > 0 && <PageControls totalPages={webhooks?.headers?.['total']} />}
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}

export default RepoSandboxWebhooksListPage
