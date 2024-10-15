/*
 * Copyright 2023 Harness, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useMemo } from 'react'
import { Badge, Button, Icon, Text } from '@harnessio/canary'
import moment from 'moment'
import { Layout } from '../layout/layout'

interface PullRequestTitleProps {
  data: {
    title?: string
    number?: number
    merged?: number | null | undefined
    author?: { display_name?: string; email?: string }
    stats?: { commits?: number | null }
    target_branch?: string
    source_branch?: string
    created?: number
    is_draft?: boolean
    state?: string
  }
}
type IconType = 'pr-open' | 'pr-closed' | 'pr-draft' | 'pr-merge'

export const PullRequestHeader: React.FC<PullRequestTitleProps> = ({
  data: { title, number, merged, author, stats, target_branch, source_branch, created, is_draft, state }
}) => {
  const [original] = useMemo(() => [title], [title])
  const parsedDate = moment(created)

  // Format the parsed date as relative time from now
  const formattedTime = parsedDate.fromNow()

  const getState = () => {
    if (state === 'open' && is_draft) {
      return { icon: 'pr-draft', text: 'Draft', theme: 'warning' }
    } else if (merged) {
      return { icon: 'pr-merge', text: 'Merged', theme: 'emphasis' }
    } else if (state === 'closed') {
      return { icon: 'pr-closed', text: 'Closed', theme: 'muted' }
    } else {
      return { icon: 'pr-open', text: 'Open', theme: 'success' }
    }
  }
  const stateObject = getState()
  return (
    <div className="flex flex-col gap-2 pb-8">
      <div className="flex pt-1 pb-1 items-center">
        <Text size={5} weight={'medium'} className="text-primary">
          {original}
          &nbsp;&nbsp;
          <span className="text-tertiary-background font-normal">#{number}</span>
        </Text>
      </div>
      <div className="">
        <div className="flex space-x-2 text-tertiary-background ">
          <div className="flex gap-2.5 items-center align-middle text-center">
            <Badge disableHover borderRadius="full" theme={stateObject.theme} className={`select-none justify-center`}>
              <Layout.Horizontal gap="space-x-1" className="flex items-center align-middle">
                <Icon name={stateObject.icon as IconType} size={13} />
                &nbsp;{stateObject.text}
              </Layout.Horizontal>
            </Badge>
            <div className="flex gap-2">
              <Text
                size={2}
                className="text-tertiary-background inline-flex flex-wrap gap-1 items-center"
                weight="normal">
                <span className="text-primary">{author?.display_name || author?.email || ''}</span>
                <span>{merged ? 'merged' : ' wants to merge'}</span>
                <span className="text-primary">
                  {stats?.commits} {stats?.commits === 1 ? 'commit' : 'commits'}
                </span>
                <span>into</span>
                <Button variant="secondary" size="xs">
                  <Icon name="branch" size={12} className="text-tertiary-background mr-1" />
                  {target_branch}
                </Button>
                <span>from</span>
                <Button variant="secondary" size="xs">
                  <Icon name="branch" size={12} className="text-tertiary-background mr-1" />
                  {source_branch}
                </Button>
                <span>&nbsp;|&nbsp;</span>
                <span className="time">{formattedTime}</span>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
