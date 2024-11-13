import React, { useEffect } from 'react'
import { usePullRequestDataStore } from '../stores/pull-request-store'
import { useGetSpaceURLParam } from '../../../framework/hooks/useGetSpaceParam'
import { useGetRepoRef } from '../../../framework/hooks/useGetRepoPath'
import { useParams } from 'react-router-dom'
import { PathParams } from '../../../RouteDefinitions'
import useGetPullRequestTab, { PullRequestTab } from '../../../hooks/useGetPullRequestTab'
import {
  useFindRepositoryQuery,
  useGetPullReqQuery,
  useListCommitsQuery,
  useListPullReqActivitiesQuery
} from '@harnessio/code-service-client'
import { normalizeGitRef } from '../../../utils/git-utils'
import { usePRChecksDecision } from '../hooks/usePRChecksDecision'
import { SSEEvent } from '../../../types'
import useSpaceSSE from '../../../framework/hooks/useSpaceSSE'
import { extractSpecificViolations } from '../utils'
import { isEqual } from 'lodash-es'
export const codeOwnersNotFoundMessage = 'CODEOWNERS file not found'
export const codeOwnersNotFoundMessage2 = `path "CODEOWNERS" not found`
export const codeOwnersNotFoundMessage3 = `failed to find node 'CODEOWNERS' in 'main': failed to get tree node: failed to ls file: path "CODEOWNERS" not found`
export const oldCommitRefetchRequired = 'A newer commit is available. Only the latest commit can be merged.'
export const prMergedRefetchRequired = 'Pull request already merged'
export const POLLING_INTERVAL = 10000
const PullRequestDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const space = useGetSpaceURLParam() ?? ''
  const repoRef = useGetRepoRef()
  const { pullRequestId, spaceId, repoId } = useParams<PathParams>()
  const pullRequestTab = useGetPullRequestTab({ spaceId, repoId, pullRequestId })
  const { data: { body: repoMetadata } = {} } = useFindRepositoryQuery({ repo_ref: repoRef })
  const store = usePullRequestDataStore()
  const {
    pullReqMetadata,
    dryMerge,
    setCommentsInfoData,
    setCommentsLoading,
    prPanelData,
    setResolvedCommentArr,
    setPullReqMetadata,
    setPullReqStats,
    pullReqStats,
    setRepoMetadata
  } = store

  const {
    data: { body: pullReqData } = {},
    error: pullReqError,
    isFetching: pullReqLoading,
    refetch: refetchPullReq
  } = useGetPullReqQuery({
    repo_ref: repoRef,
    pullreq_number: Number(pullRequestId),
    queryParams: {}
  })
  const {
    data: { body: activities } = {},
    isFetching: activitiesLoading,
    error: activitiesError,
    refetch: refetchActivities
  } = useListPullReqActivitiesQuery({
    repo_ref: repoRef,
    pullreq_number: Number(pullRequestId),
    queryParams: {}
  })
  const {
    data: { body: commits } = {},
    error: commitsError,
    refetch: refetchCommits
  } = useListCommitsQuery({
    queryParams: {
      limit: 500,
      git_ref: normalizeGitRef(pullReqData?.source_sha),
      after: normalizeGitRef(pullReqData?.merge_base_sha)
    },
    repo_ref: repoRef
  })
  const pullReqChecksDecision = usePRChecksDecision({ repoMetadata, pullReqMetadata: pullReqData })
  useSpaceSSE({
    space,
    events: [SSEEvent.PULLREQ_UPDATED],
    onEvent: data => {
      if (data && String(data?.number) === pullRequestId) {
        refetchPullReq()
      }
    }
  })
  useEffect(() => {
    if (repoMetadata) {
      setRepoMetadata(repoMetadata)
    }
  }, [repoMetadata, setRepoMetadata])
  useEffect(
    () => {
      store.updateState({
        repoMetadata,
        setPullReqMetadata,
        pullReqMetadata: pullReqData,
        pullReqStats: pullReqData?.stats,
        pullReqCommits: commits,
        pullReqActivities: activities,
        loading: pullReqLoading || activitiesLoading,
        error: pullReqError || activitiesError || commitsError,
        pullReqChecksDecision,
        refetchActivities,
        refetchCommits,
        refetchPullReq,
        retryOnErrorFunc: () => {
          if (pullReqError) {
            refetchPullReq()
          } else if (commitsError) {
            refetchCommits()
          } else {
            refetchActivities()
          }
        },
        prPanelData: {
          conflictingFiles: undefined,
          requiresCommentApproval: false,
          atLeastOneReviewerRule: false,
          reqCodeOwnerApproval: false,
          minApproval: 0,
          reqCodeOwnerLatestApproval: false,
          minReqLatestApproval: 0,
          resolvedCommentArr: undefined,
          PRStateLoading: false,
          ruleViolation: false,
          commentsLoading: false,
          commentsInfoData: {
            header: '',
            content: undefined,
            status: ''
          },
          ruleViolationArr: undefined
        }
      })
    },
    [
      // repoMetadata,
      // pullReqData,
      // commits,
      // activities,
      // pullReqLoading,
      // activitiesLoading,
      // pullReqError,
      // activitiesError,
      // commitsError,
      // pullReqChecksDecision,
      // refetchActivities,
      // refetchCommits,
      // refetchPullReq
    ]
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(pullReqMetadata, pullRequestTab, repoRef)
      if (pullReqMetadata?.source_sha && pullRequestTab === PullRequestTab.CONVERSATION && repoRef) {
        console.log('dryMerge', pullReqMetadata)
        dryMerge()
      }
    }, 10000) // Poll every 10 seconds

    return () => clearInterval(intervalId)
  }, [pullReqMetadata?.source_sha, pullRequestTab, repoRef])

  useEffect(() => {
    if (repoRef && pullReqData?.source_sha) {
      dryMerge()
    }
  }, [repoRef, pullReqData?.source_sha, pullRequestTab])

  useEffect(() => {
    const resolvedComments = prPanelData.requiresCommentApproval && !prPanelData.resolvedCommentArr?.params
    if (resolvedComments) {
      setCommentsInfoData({ header: 'All comments are resolved', content: undefined, status: 'success' })
    } else {
      setCommentsInfoData({
        header: 'Unresolved comments',
        content: `There are ${prPanelData.resolvedCommentArr?.params} unresolved comments`,
        status: 'failed'
      })
    }
    setCommentsLoading(false)
  }, [prPanelData.requiresCommentApproval, prPanelData.resolvedCommentArr?.params])

  useEffect(() => {
    const ruleViolationArr = prPanelData.ruleViolationArr
    console.log('ruleViolationArr', ruleViolationArr, prPanelData)
    if (ruleViolationArr) {
      const requireResCommentRule = extractSpecificViolations(ruleViolationArr, 'pullreq.comments.require_resolve_all')
      if (requireResCommentRule) {
        setResolvedCommentArr(requireResCommentRule[0])
      }
    }
  }, [prPanelData.ruleViolationArr])

  useEffect(() => {
    if (pullReqData && !isEqual(pullReqMetadata, pullReqData)) {
      if (
        !pullReqMetadata ||
        (pullReqMetadata &&
          (pullReqMetadata.merge_base_sha !== pullReqData.merge_base_sha ||
            pullReqMetadata.source_sha !== pullReqData.source_sha))
      ) {
        refetchCommits()
      }

      setPullReqMetadata(pullReqData)

      if (!isEqual(pullReqStats, pullReqData.stats)) {
        setPullReqStats(pullReqData.stats)
        refetchActivities()
      }
    }
  }, [pullReqData, pullReqMetadata, pullReqStats, refetchActivities, refetchCommits])

  return <>{children}</>
}

export default PullRequestDataProvider
