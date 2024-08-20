import React from 'react'
import PullRequestSideBar from './pull-request-side-bar'
import { EnumPullReqReviewDecision, processReviewDecision } from './utils'

const mockReviewers = [
  {
    created: 1711754093953,
    updated: 1711754093953,
    type: 'self_assigned',
    latest_review_id: 111,
    review_decision: 'changereq' as EnumPullReqReviewDecision,
    sha: '73b10cca5b9f5121822f31b81346954e5f1dce99',
    reviewer: {
      id: 5,
      uid: 'default',
      display_name: 'default',
      email: 'default@harness.io',
      type: 'user',
      created: 1700943243392,
      updated: 1700943243392
    },
    added_by: {
      id: 5,
      uid: 'default',
      display_name: 'default',
      email: 'default@harness.io',
      type: 'user',
      created: 1700943243392,
      updated: 1700943243392
    }
  }
]

export default function PullRequestConversation() {
  return (
    <div>
      <div className="grid grid-cols-[70%_30%]">
        <div className=" border mt-1 border-gray rounded-md">test</div>
        <PullRequestSideBar
          // repoMetadata={undefined}
          pullRequestMetadata={undefined}
          processReviewDecision={processReviewDecision}
          refetchReviewers={function (): void {
            throw new Error('Function not implemented.')
          }}
          reviewers={mockReviewers}
        />
      </div>
      <div className="grid grid-cols-[70%_30%]">
        <div className={'mt-2 pt-4 flex flew-row space-x-2 justify-between'}>
          <div className="">Overview</div>
          <div className="">Show Everything</div>
        </div>
      </div>
    </div>
  )
}
