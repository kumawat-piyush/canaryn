import React from 'react'
import { noop } from 'lodash-es'
import { SandboxPullRequestCompare } from '../layouts/SandboxPullRequestCompareLayout'
import { mockCommitData } from '../data/mockCommitData'
import { mockBranchList } from '../data/mockBranchList'

const SandboxPullRequestComparePage = () => {
  return (
    <>
      <SandboxPullRequestCompare
        branchList={mockBranchList}
        mergeability
        apiError=""
        isLoading={false}
        isSuccess={false}
        onFormCancel={noop}
        onFormSubmit={noop}
        onFormDraftSubmit={noop}
        selectSourceBranch={noop}
        selectTargetBranch={noop}
        commitData={mockCommitData}
      />
    </>
  )
}

export default SandboxPullRequestComparePage
