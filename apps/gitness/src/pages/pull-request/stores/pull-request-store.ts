import create from 'zustand'
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
import { ExecutionState } from '@harnessio/playground'
import { CodeCommentState, PullRequestState } from '../types/types'

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
  loading: boolean // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  setRepoMetadata: metadata => set({ repoMetadata: metadata }),
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
  setShowEditDescription: show => set({ showEditDescription: show }),
  setRuleViolationArr: arr =>
    set(state => ({
      prPanelData: {
        ...state.prPanelData,
        ruleViolationArr: arr
      }
    })),
  refetchActivities: () => {},
  refetchCommits: () => {},
  refetchPullReq: () => {},
  retryOnErrorFunc: () => {},
  dryMerge: () => {
    const { repoMetadata, pullReqMetadata, refetchPullReq, setRuleViolationArr } = get()
    const isClosed = pullReqMetadata?.state === PullRequestState.CLOSED
    console.log('dryMerge2', isClosed, repoMetadata?.path, pullReqMetadata?.state)
    if (!isClosed && repoMetadata?.path !== undefined && pullReqMetadata?.state !== PullRequestState.MERGED) {
      mergePullReqOp({
        repo_ref: `${repoMetadata?.path}/+`,
        pullreq_number: Number(pullReqMetadata?.number),
        body: { bypass_rules: true, dry_run: true, source_sha: pullReqMetadata?.source_sha }
      })
        .then(({ body: res }) => {
          if (res?.rule_violations?.length && res?.rule_violations?.length > 0) {
            console.log('ruleViolations', res.rule_violations)
            set({
              prPanelData: {
                ...get().prPanelData,
                ruleViolation: true,
                ruleViolationArr: { data: { rule_violations: res.rule_violations } }
              }
            })
          } else {
            set({ prPanelData: { ...get().prPanelData, ruleViolation: false, ruleViolationArr: undefined } })
          }
        })
        .catch(err => {
          if (err.status === 422) {
            setRuleViolationArr(err)
          } else if (err.status === 400) {
            refetchPullReq()
          }
        })
        .finally(() => {
          set({ prPanelData: { ...get().prPanelData, PRStateLoading: false } })
        })
    } else if (pullReqMetadata?.state === PullRequestState.MERGED) {
      set({ prPanelData: { ...get().prPanelData, PRStateLoading: false } })
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
  setCommentsInfoData: info => {
    set({ prPanelData: { ...get().prPanelData, commentsInfoData: info } })
  },
  setResolvedCommentArr: resolvedCommentArr =>
    set(state => ({
      prPanelData: {
        ...state.prPanelData,
        resolvedCommentArr
      }
    })),
  setCommentsLoading: loading => set({ prPanelData: { ...get().prPanelData, commentsLoading: loading } }),
  setPullReqMetadata: metadata => set({ pullReqMetadata: metadata }),
  setPullReqStats: stats => set({ pullReqStats: stats }),
  updateState: newState => set(newState)
}))

// Export the store
export default usePullRequestDataStore
