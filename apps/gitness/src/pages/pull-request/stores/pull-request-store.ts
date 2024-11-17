import { create } from 'zustand'
import { produce } from 'immer'
import {
  ChecksPullReqOkResponse,
  ListCommitsOkResponse,
  RepoRepositoryOutput,
  TypesPullReq,
  TypesPullReqActivity,
  TypesPullReqStats,
  TypesRuleViolations,
  mergePullReqOp,
  commentStatusPullReq as apiCommentStatusPullReq
} from '@harnessio/code-service-client'
import { ExecutionState } from '@harnessio/views'
import { CodeCommentState, PullRequestState } from '../types/types'

export const codeOwnersNotFoundMessage = 'CODEOWNERS file not found'
export const codeOwnersNotFoundMessage2 = `path "CODEOWNERS" not found`
export const codeOwnersNotFoundMessage3 = `failed to find node 'CODEOWNERS' in 'main': failed to get tree node: failed to ls file: path "CODEOWNERS" not found`
export const oldCommitRefetchRequired = 'A newer commit is available. Only the latest commit can be merged.'
export const prMergedRefetchRequired = 'Pull request already merged'
export const POLLING_INTERVAL = 10000

interface PullReqChecksDecisionProps {
  overallStatus: ExecutionState | undefined
  count: {
    error: number
    failure: number
    pending: number
    running: number
    success: number
    skipped: number
    killed: number
  }
  error: unknown
  data: ChecksPullReqOkResponse | undefined
  color: string
  background: string
  message: string
  summaryText: string
  checkInfo: {
    title: string
    content: string
    color: string
    status: string
  }
}

interface PullRequestDataState {
  repoMetadata: RepoRepositoryOutput | undefined
  setRepoMetadata: (metadata: RepoRepositoryOutput) => void
  pullReqMetadata: TypesPullReq | undefined
  pullReqStats: TypesPullReqStats | undefined
  pullReqCommits: ListCommitsOkResponse | undefined
  pullReqActivities: TypesPullReqActivity[] | undefined
  loading: boolean
  error: any
  pullReqChecksDecision: PullReqChecksDecisionProps
  showEditDescription: boolean
  setShowEditDescription: (show: boolean) => void
  setRuleViolationArr: (arr: { data: { rule_violations: TypesRuleViolations[] } } | undefined) => void
  refetchActivities: () => void
  refetchCommits: () => void
  refetchPullReq: () => void
  retryOnErrorFunc: () => void
  dryMerge: () => void
  prPanelData: {
    conflictingFiles: string[] | undefined
    requiresCommentApproval: boolean
    atLeastOneReviewerRule: boolean
    reqCodeOwnerApproval: boolean
    minApproval: number
    reqCodeOwnerLatestApproval: boolean
    minReqLatestApproval: number
    resolvedCommentArr?: { params: number[] }
    PRStateLoading: boolean
    ruleViolation: boolean
    commentsLoading: boolean
    commentsInfoData: { header: string; content?: string | undefined; status: string }
    ruleViolationArr:
      | {
          data: {
            rule_violations: TypesRuleViolations[]
          }
        }
      | undefined
  }
  updateCommentStatus: (
    repoId: string,
    pullReqNumber: number,
    commentId: number,
    status: string,
    refetchActivities: () => void
  ) => Promise<TypesPullReqActivity | undefined>
  setCommentsInfoData: (info: { header: string; content?: string; status: string }) => void
  setCommentsLoading: (loading: boolean) => void
  setResolvedCommentArr: (
    resolvedCommentArr:
      | {
          params: number[]
        }
      | undefined
  ) => void
  setPullReqMetadata: (metadata: TypesPullReq | undefined) => void
  setPullReqStats: (stats: TypesPullReqStats | undefined) => void
  updateState: (newState: Partial<PullRequestDataState>) => void
}

export const usePullRequestDataStore = create<PullRequestDataState>((set, get) => ({
  repoMetadata: undefined,
  setRepoMetadata: metadata =>
    set(
      produce(draft => {
        draft.repoMetadata = metadata
      })
    ),
  pullReqMetadata: undefined,
  pullReqStats: undefined,
  pullReqCommits: undefined,
  pullReqActivities: undefined,
  loading: false,
  error: null,
  pullReqChecksDecision: {
    overallStatus: undefined,
    count: {
      error: 0,
      failure: 0,
      pending: 0,
      running: 0,
      success: 0,
      skipped: 0,
      killed: 0
    },
    error: null,
    data: undefined,
    color: '',
    background: '',
    message: '',
    summaryText: '',
    checkInfo: {
      title: '',
      content: '',
      color: '',
      status: ''
    }
  },
  showEditDescription: false,
  setShowEditDescription: show =>
    set(
      produce(draft => {
        draft.showEditDescription = show
      })
    ),
  setRuleViolationArr: arr =>
    set(
      produce(draft => {
        draft.prPanelData.ruleViolationArr = arr
      })
    ),
  refetchActivities: () => {},
  refetchCommits: () => {},
  refetchPullReq: () => {},
  retryOnErrorFunc: () => {},
  dryMerge: () => {
    const { repoMetadata, pullReqMetadata, refetchPullReq } = get()
    const isClosed = pullReqMetadata?.state === PullRequestState.CLOSED
    if (!isClosed && repoMetadata?.path !== undefined && pullReqMetadata?.state !== PullRequestState.MERGED) {
      mergePullReqOp({
        repo_ref: `${repoMetadata?.path}/+`,
        pullreq_number: Number(pullReqMetadata?.number),
        body: { bypass_rules: true, dry_run: true, source_sha: pullReqMetadata?.source_sha }
      })
        .then(({ body: res }) => {
          set(
            produce(draft => {
              if (res?.rule_violations?.length && res?.rule_violations?.length > 0) {
                draft.prPanelData = {
                  ruleViolation: true,
                  ruleViolationArr: { data: { rule_violations: res.rule_violations } },
                  requiresCommentApproval: res.requires_comment_resolution ?? false,
                  atLeastOneReviewerRule: res.requires_no_change_requests ?? false,
                  reqCodeOwnerApproval: res.requires_code_owners_approval ?? false,
                  minApproval: res.minimum_required_approvals_count ?? 0,
                  reqCodeOwnerLatestApproval: res.requires_code_owners_approval_latest ?? false,
                  minReqLatestApproval: res.minimum_required_approvals_count_latest ?? 0,
                  conflictingFiles: res.conflict_files,
                  PRStateLoading: false,
                  commentsLoading: false,
                  commentsInfoData: {
                    header: '',
                    content: undefined,
                    status: ''
                  }
                }
              } else {
                draft.prPanelData = {
                  ruleViolation: false,
                  ruleViolationArr: undefined,
                  requiresCommentApproval: res.requires_comment_resolution ?? false,
                  atLeastOneReviewerRule: res.requires_no_change_requests ?? false,
                  reqCodeOwnerApproval: res.requires_code_owners_approval ?? false,
                  minApproval: res.minimum_required_approvals_count ?? 0,
                  reqCodeOwnerLatestApproval: res.requires_code_owners_approval_latest ?? false,
                  minReqLatestApproval: res.minimum_required_approvals_count_latest ?? 0,
                  conflictingFiles: res.conflict_files,
                  PRStateLoading: false,
                  commentsLoading: false,
                  commentsInfoData: {
                    header: '',
                    content: undefined,
                    status: ''
                  }
                }
              }
            })
          )
        })
        .catch(err => {
          set(
            produce(draft => {
              if (err.status === 422) {
                draft.prPanelData = {
                  ruleViolation: true,
                  ruleViolationArr: err,
                  requiresCommentApproval: err.requires_comment_resolution ?? false,
                  atLeastOneReviewerRule: err.requires_no_change_requests ?? false,
                  reqCodeOwnerApproval: err.requires_code_owners_approval ?? false,
                  minApproval: err.minimum_required_approvals_count ?? 0,
                  reqCodeOwnerLatestApproval: err.requires_code_owners_approval_latest ?? false,
                  minReqLatestApproval: err.minimum_required_approvals_count_latest ?? 0,
                  conflictingFiles: err.conflict_files,
                  PRStateLoading: false,
                  commentsLoading: false,
                  commentsInfoData: {
                    header: '',
                    content: undefined,
                    status: ''
                  }
                }
              } else if (err.status === 400) {
                refetchPullReq()
              } else if (
                err.message === codeOwnersNotFoundMessage ||
                err.message === codeOwnersNotFoundMessage2 ||
                err.message === codeOwnersNotFoundMessage3 ||
                err.status === 423 // resource locked (merge / dry-run already ongoing)
              ) {
                return
              }
            })
          )
        })
        .finally(() => {
          set(
            produce(draft => {
              draft.prPanelData.PRStateLoading = false
            })
          )
        })
    } else if (pullReqMetadata?.state === PullRequestState.MERGED) {
      set(
        produce(draft => {
          draft.prPanelData.PRStateLoading = false
        })
      )
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
  },
  updateCommentStatus: async (
    repoId: string,
    pullReqNumber: number,
    commentId: number,
    status: string,
    refetchActivities: () => void
  ) => {
    const payload = { status: status.toLowerCase() as CodeCommentState }
    try {
      const data = await apiCommentStatusPullReq({
        repo_ref: repoId,
        pullreq_number: pullReqNumber,
        pullreq_comment_id: commentId,
        body: payload
      })
      refetchActivities()
      return data
    } catch (error) {
      console.warn(error)
      return undefined
    }
  },
  setCommentsInfoData: info =>
    set(
      produce(draft => {
        draft.prPanelData.commentsInfoData = info
      })
    ),
  setResolvedCommentArr: resolvedCommentArr =>
    set(
      produce(draft => {
        draft.prPanelData.resolvedCommentArr = resolvedCommentArr
      })
    ),
  setCommentsLoading: loading =>
    set(
      produce(draft => {
        draft.prPanelData.commentsLoading = loading
      })
    ),
  setPullReqMetadata: metadata =>
    set(
      produce(draft => {
        draft.pullReqMetadata = metadata
      })
    ),
  setPullReqStats: stats =>
    set(
      produce(draft => {
        draft.pullReqStats = stats
      })
    ),
  updateState: newState =>
    set(
      produce(draft => {
        Object.assign(draft, newState)
      })
    )
}))
