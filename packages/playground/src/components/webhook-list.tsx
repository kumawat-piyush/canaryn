import { StackedList, Text } from '@harnessio/canary'
import React from 'react'

export enum MeterState {
  Empty = 0,
  Error = 1,
  Warning = 2,
  Success = 3
}

interface Webhook {
  id: string
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
  webhooks?: Webhook[]
  LinkComponent: React.ComponentType<{ to: string; children: React.ReactNode }>
}

const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <Text truncate>{title}</Text>
    </div>
  )
}

export const WebhooksList = ({ webhooks, LinkComponent }: PageProps) => {
  return (
    <>
      {webhooks && webhooks.length > 0 && (
        <StackedList.Root>
          {webhooks.map((webhook, webhook_idx) => (
            <LinkComponent to={webhook.id}>
              <StackedList.Item key={webhook.name} isLast={webhooks.length - 1 === webhook_idx}>
                <StackedList.Field title={<Title title="Col 1" />} />
                <StackedList.Field label secondary title={'Col 2'} right />
              </StackedList.Item>
            </LinkComponent>
          ))}
        </StackedList.Root>
      )}
    </>
  )
}
