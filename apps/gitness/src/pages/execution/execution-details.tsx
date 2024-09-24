import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFindExecutionQuery, useViewLogsQuery } from '@harnessio/code-service-client'
import { Badge, Icon, ScrollArea, Separator, Text } from '@harnessio/canary'
import { Layout, ExecutionTree, ExecutionStatus, StageExecution, ContactCard } from '@harnessio/playground'
import { PathParams } from '../../RouteDefinitions'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { ExecutionState } from '../../types'
import { getDuration, timeAgoFromEpochTime } from '../pipeline-edit/utils/time-utils'

const ExecutionLogs: React.FC = () => {
  const { pipelineId, executionId } = useParams<PathParams>()
  const repoRef = useGetRepoRef()
  const [stageNum, _setStageNum] = useState<string>('1')
  const [stepNum, _setStepNum] = useState<string>('1')
  const pipelineIdentifier = pipelineId || ''
  const executionNum = executionId || ''

  const { data: execution } = useFindExecutionQuery({
    pipeline_identifier: pipelineIdentifier,
    execution_number: executionNum,
    repo_ref: repoRef
  })

  const { data: logs } = useViewLogsQuery({
    pipeline_identifier: pipelineIdentifier,
    execution_number: executionNum,
    repo_ref: repoRef,
    stage_number: stageNum,
    step_number: stepNum
  })

  return (
    <Layout.Horizontal className="px-8">
      <div className="w-2/3">
        {execution?.stages?.[0] && <StageExecution stage={execution.stages?.[0]} logs={logs || []} />}
      </div>
      <ScrollArea className="w-1/3 h-[calc(100vh-16rem)] pt-4">
        <ContactCard
          imgSrc="https://github.com/shadcn.png"
          authorName={execution?.author_name || ''}
          authorEmail={execution?.author_email || ''}
        />
        <div className="flex flex-col gap-2 my-5">
          <Text className="text-white text-base">{execution?.message}</Text>
          <div className="flex gap-2 items-center">
            <Badge variant="secondary" className="bg-primary-foreground flex gap-1">
              <Layout.Horizontal gap="space-x-1" className="flex items-center">
                <Icon size={12} name={'tube-sign'} />
                <Text className="text-sm text-git pb-0.5">{execution?.source}</Text>
              </Layout.Horizontal>
            </Badge>
            <span>to</span>
            <Badge variant="secondary" className="flex gap-1 bg-primary-foreground">
              <Layout.Horizontal gap="space-x-1" className="flex items-center">
                <Icon size={12} name={'git-branch'} />
                <Text className="text-sm text-git pb-0.5">{execution?.target}</Text>
              </Layout.Horizontal>
            </Badge>
          </div>
        </div>
        <Layout.Horizontal>
          {execution?.status && (
            <Layout.Vertical gap="space-y-1">
              <Text className="text-sm text-muted-foreground">Status</Text>
              <ExecutionStatus.Badge
                status={execution.status as ExecutionState}
                minimal
                duration={getDuration(execution?.started, execution?.finished)}
              />
            </Layout.Vertical>
          )}
          {execution?.created && (
            <Layout.Vertical gap="space-y-1">
              <Text className="text-sm text-muted-foreground">Created</Text>
              <span className="text-white">{timeAgoFromEpochTime(execution.created)}</span>
            </Layout.Vertical>
          )}
        </Layout.Horizontal>
        <Separator className="my-4" />
        <ExecutionTree defaultSelectedId="2" elements={[]} onSelectNode={() => {}} />
      </ScrollArea>
    </Layout.Horizontal>
  )
}

export const Execution: React.FC = () => {
  return <ExecutionLogs />
}
