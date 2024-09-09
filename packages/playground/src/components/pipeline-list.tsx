import { Icon, StackedList, Meter, Text } from '@harnessio/canary'
import React from 'react'

export enum MeterState {
  Empty = 0,
  Error = 1,
  Warning = 2,
  Success = 3
}

interface Pipeline {
  id: string
  success?: boolean | undefined
  name: string
  sha?: string
  description?: string
  version?: string
  timestamp: string
  meter?: {
    id: string
    state: MeterState
  }[]
}

interface PageProps {
  pipelines?: Pipeline[]
  LinkComponent: React.ComponentType<{ to: string; children: React.ReactNode }>
}

const Title = ({ success, title }: { success?: boolean; title: string }) => {
  return (
    <div className="flex gap-2 items-center">
      {typeof success === 'boolean' ? (
        <Icon size={16} name={success ? 'success' : 'fail'} />
      ) : (
        <div className="w-4 h-4 rounded-full bg-primary/5 border border-muted border-dotted" />
      )}
      <span>{title}</span>
    </div>
  )
}

const Description = ({ sha, description, version }: { sha: string; description: string; version: string }) => {
  return (
    <div className="pl-[24px] inline-flex gap-2 items-center max-w-full overflow-hidden">
      {sha && (
        <div className="px-1.5 rounded-md flex gap-1 items-center bg-tertiary-background/10">
          <Icon size={11} name={'tube-sign'} />
          {sha}
        </div>
      )}
      {description && (
        <div className="break-words w-full overflow-hidden">
          <Text size={1} color="tertiaryBackground">
            {description || ''}
          </Text>
        </div>
      )}
      {version && (
        <div className="flex gap-1 items-center">
          <Icon size={11} name={'signpost'} />
          {version}
        </div>
      )}
    </div>
  )
}

export const PipelineList = ({ pipelines, LinkComponent }: PageProps) => {
  return (
    <>
      {pipelines && pipelines.length > 0 && (
        <StackedList.Root>
          {pipelines.map((pipeline, pipeline_idx) => (
            <LinkComponent to={pipeline.id}>
              <StackedList.Item key={pipeline.name} isLast={pipelines.length - 1 === pipeline_idx}>
                {/* <Link to={`${pipeline.id}`}> */}
                <StackedList.Field
                  title={<Title success={pipeline.success} title={pipeline.name} />}
                  description={
                    <Description
                      sha={pipeline.sha || ''}
                      description={pipeline.description || ''}
                      version={pipeline.version || ''}
                    />
                  }
                />
                <StackedList.Field
                  label
                  secondary
                  title={pipeline.meter ? <Meter.Root data={pipeline.meter} /> : pipeline.timestamp}
                  right
                />
                {/* </Link> */}
              </StackedList.Item>
            </LinkComponent>
          ))}
        </StackedList.Root>
      )}
    </>
  )
}
