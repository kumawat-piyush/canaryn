import { useCallback, useEffect } from 'react'
import { usePullRequestDataStore } from '../stores/pull-request-store'
import { useGetSpaceURLParam } from '../../../framework/hooks/useGetSpaceParam'
import { useGetRepoRef } from '../../../framework/hooks/useGetRepoPath'
import { useParams } from 'react-router-dom'
import { PathParams } from '../../../RouteDefinitions'
import useGetPullRequestTab, { PullRequestTab } from '../../../hooks/useGetPullRequestTab'
import {
  TypesPullReq,
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
  const handleEvent = useCallback(
    (data: TypesPullReq) => {
      if (data && String(data?.number) === pullRequestId) {
        refetchPullReq()
      }
    },
    [pullRequestId, refetchPullReq]
  )
  useSpaceSSE({
    space,
    events: [SSEEvent.PULLREQ_UPDATED],
    onEvent: handleEvent,
    shouldRun: !!(space && pullRequestId) // Ensure shouldRun is true only when space and pullRequestId are valid
  })
  useEffect(() => {
    if (repoMetadata) {
      setRepoMetadata(repoMetadata)
    }
  }, [repoMetadata, setRepoMetadata])
  useEffect(() => {
    const hasChanges =
      !isEqual(store.pullReqMetadata, pullReqData) ||
      !isEqual(store.pullReqStats, pullReqData?.stats) ||
      !isEqual(store.pullReqCommits, commits) ||
      !isEqual(store.pullReqActivities, activities)

    if (hasChanges) {
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
    }
  }, [
    repoMetadata,
    pullReqData,
    commits,
    activities,
    pullReqLoading,
    activitiesLoading,
    pullReqError,
    activitiesError,
    commitsError,
    pullReqChecksDecision,
    refetchActivities,
    refetchCommits,
    refetchPullReq
  ])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (pullReqMetadata?.source_sha && pullRequestTab === PullRequestTab.CONVERSATION && repoRef) {
        dryMerge()
        console.log(prPanelData, 22222)
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
    if (ruleViolationArr) {
      const requireResCommentRule = extractSpecificViolations(ruleViolationArr, 'pullreq.comments.require_resolve_all')
      if (requireResCommentRule) {
        setResolvedCommentArr(requireResCommentRule[0])
      }
    }
  }, [prPanelData.ruleViolationArr])

  return <>{children}</>
}

export default PullRequestDataProvider
