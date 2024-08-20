import React from 'react'
import {
  Plus,
  CheckCircleSolid,
  WarningTriangleSolid,
  WarningCircleSolid,
  ChatBubbleQuestionSolid
} from '@harnessio/icons-noir'
import { Else, Match, Truthy } from 'react-jsx-match'
import { Button, Avatar, AvatarFallback } from '@harnessio/canary'
import { EnumPullReqReviewDecision, PullReqReviewDecision, ReviewerData } from './utils'

interface PullRequestSideBarProps {
  reviewers?: ReviewerData[]
  // repoMetadata?: any
  //   RepoRepositoryOutput
  processReviewDecision: (
    review_decision: EnumPullReqReviewDecision,
    reviewedSHA?: string,
    sourceSHA?: string
  ) => EnumPullReqReviewDecision | PullReqReviewDecision.outdated
  pullRequestMetadata?: { source_sha: string }
  //   TypesPullReq
  refetchReviewers: () => void
}

const PullRequestSideBar = (props: PullRequestSideBarProps) => {
  const { reviewers, pullRequestMetadata, processReviewDecision } = props
  // add toaster error message
  //   const { showError } = useToaster()

  const getInitials = (name: string) => {
    // Split the name into an array of words
    const words = name.split(' ')
    // Map over the words to get the first letter of each
    const initials = words.map(word => word[0].toUpperCase()).join('')
    // Return the initials
    return initials
  }
  return (
    <div className="pl-16">
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className=" text-white font-[500] text-sm">Reviewers</div>
          <div className="flex-grow"></div>

          {/* TODO: how to handle dropdown or add new button */}
          {/* <ReviewerSelect
              pullRequestMetadata={pullRequestMetadata}
              onSelect={function (id: number): void {
                updateCodeCommentStatus({ reviewer_id: id }).catch(err => {
                  showError(getErrorMessage(err))
                })
                if (refetchReviewers) {
                  refetchReviewers()
                }
              }}
            /> */}
          <Button className="py-1 " size="sm" variant="outline">
            <Plus className="pr-1" />
            Add
          </Button>
        </div>
        <div className="pt-2 pb-4">
          <Match expr={reviewers && reviewers.length !== 0 && reviewers !== null}>
            <Truthy>
              {reviewers?.map(
                (reviewer: {
                  reviewer: { display_name: string; id: number }
                  review_decision: EnumPullReqReviewDecision
                  sha: string
                }) => {
                  const updatedReviewDecision = processReviewDecision(
                    reviewer.review_decision,
                    reviewer.sha,
                    pullRequestMetadata?.source_sha
                  )

                  // const reviewerInfo = generateReviewDecisionInfo(updatedReviewDecision)
                  return (
                    <div key={reviewer.reviewer.id} className="flex items-center space-x-2 mr-1">
                      <Avatar
                        className={`w-6 h-6 rounded-full ${
                          updatedReviewDecision !== PullReqReviewDecision.changeReq ? 'p-0' : ''
                        }`}>
                        <AvatarFallback>
                          <span className="text-[12px]"> {getInitials(reviewer.reviewer.display_name)}</span>
                        </AvatarFallback>
                      </Avatar>
                      <div className="truncate reviewerName">{reviewer.reviewer.display_name}</div>
                      <div className="flex-grow"></div>

                      {updatedReviewDecision === PullReqReviewDecision.outdated ? (
                        <ChatBubbleQuestionSolid color="#E29B36" />
                      ) : updatedReviewDecision === PullReqReviewDecision.approved ? (
                        <CheckCircleSolid color="#63E9A6" />
                      ) : updatedReviewDecision === PullReqReviewDecision.changeReq ? (
                        <WarningTriangleSolid color="#ED5E5E" />
                      ) : updatedReviewDecision === PullReqReviewDecision.pending ? (
                        <WarningCircleSolid color="#E29B36" />
                      ) : null}
                    </div>
                  )
                }
              )}
            </Truthy>
            <Else>
              <div className="text-gray-300 text-sm font-[500]">No reviewers</div>
            </Else>
          </Match>
        </div>
      </div>
    </div>
  )
}

export default PullRequestSideBar
