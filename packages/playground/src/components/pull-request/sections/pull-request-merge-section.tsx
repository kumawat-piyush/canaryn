import { AccordionContent, AccordionItem, AccordionTrigger, Icon, StackedList, Text } from '@harnessio/canary'
import { Clock, WarningTriangleSolid } from '@harnessio/icons-noir'
import React from 'react'
import { LineTitle, LineDescription } from '../pull-request-line-title'
interface PullRequestMergeSectionProps {
  unchecked: boolean
  mergeable: boolean
  pullReqMetadata: { target_branch?: string }
}

const PullRequestMergeSection = ({ unchecked, mergeable, pullReqMetadata }: PullRequestMergeSectionProps) => {
  return (
    <AccordionItem value="item-4" isLast>
      <AccordionTrigger
        className="text-left"
        hideChevron
        //   hideChevron={!mergeable || !unchecked}
      >
        <StackedList.Field
          title={
            <LineTitle
              text={
                unchecked
                  ? 'Merge check in progress...'
                  : !mergeable
                    ? 'Conflicts found in this branch'
                    : `This branch has no conflicts with ${pullReqMetadata.target_branch} branch`
              }
              icon={
                unchecked ? (
                  // TODO: update icon for unchecked status
                  <Clock className="text-warning mt-1" />
                ) : (
                  <>
                    {mergeable ? (
                      <Icon name="success" className="text-success mt-1" />
                    ) : (
                      <WarningTriangleSolid className="text-destructive mt-1" />
                    )}
                  </>
                )
              }
            />
          }
          description={
            unchecked ? (
              <LineDescription text={'Checking for ability to merge automatically...'} />
            ) : !mergeable ? (
              <div className="ml-6 inline-flex gap-2 items-center">
                <Text size={1} weight="normal" color={'tertiaryBackground'}>
                  Use the
                  <span
                    // onClick={() => {
                    //   // TODO:add commandline information modal
                    //   // toggleShowCommandLineInfo(!showCommandLineInfo)
                    // }}
                    // className="pl-1 pr-1 text-blue-500 cursor-pointer">

                    className="pl-1 pr-1 text-blue-500 ">
                    {/* {getString('commandLine')} */}
                    command line
                  </span>
                  to resolve conflicts
                  {/* {getString('pr.useCmdLineToResolveConflicts')} */}
                </Text>
              </div>
            ) : (
              ''
            )
          }
        />
        {/* {!mergeable && !unchecked && (
          <Text className="pr-2" size={1}>
            Show more
          </Text>
        )} */}
      </AccordionTrigger>
      <AccordionContent>
        <Text className="text-grey-60">You can proceed with the merge.</Text>
      </AccordionContent>
    </AccordionItem>
  )
}

export default PullRequestMergeSection
