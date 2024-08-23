import React from 'react'
import { Text } from '@harnessio/canary'

import { CheckCircleSolid } from '@harnessio/icons-noir'
interface PullRequestMergeSectionProps {
  commentsInfo: { header: string; content?: string | undefined; status: string }
}
const PullRequestCommentSection = ({ commentsInfo }: PullRequestMergeSectionProps) => {
  return (
    <div className="py-4 border-b">
      <div className="flex justify-between">
        <div className="flex">
          <CheckCircleSolid className="text-success mt-1" />
          <div className="pl-4 flex flex-col">
            <Text size={2}>{commentsInfo.header}</Text>
            {commentsInfo?.content && (
              <Text className="text-tertiary-background" size={1}>
                {commentsInfo.content}
              </Text>
            )}
          </div>
        </div>
      </div>
      {/* TODO: add expanded section and show more/less button */}
    </div>
  )
}

export default PullRequestCommentSection
