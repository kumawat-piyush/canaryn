export enum PRCommentFilterType {
  SHOW_EVERYTHING = 'showEverything',
  ALL_COMMENTS = 'allComments',
  MY_COMMENTS = 'myComments',
  RESOLVED_COMMENTS = 'resolvedComments',
  UNRESOLVED_COMMENTS = 'unresolvedComments'
}
export type EnumPullReqReviewDecision = 'approved' | 'changereq' | 'pending' | 'reviewed'

export enum orderSortDate {
  ASC = 'asc',
  DESC = 'desc'
}

export enum PullReqReviewDecision {
  approved = 'approved',
  changeReq = 'changereq',
  pending = 'pending',
  outdated = 'outdated'
}
export interface Reviewer {
  id: number
  uid: string
  display_name: string
  email: string
  type: string
  created: number
  updated: number
}

export enum MergeCheckStatus {
  MERGEABLE = 'mergeable',
  UNCHECKED = 'unchecked',
  CONFLICT = 'conflict'
}

export enum PullRequestState {
  OPEN = 'open',
  MERGED = 'merged',
  CLOSED = 'closed'
}

export interface AddedBy {
  id: number
  uid: string
  display_name: string
  email: string
  type: string
  created: number
  updated: number
}

export interface ReviewerData {
  created: number
  updated: number
  type: string
  latest_review_id: number
  review_decision: EnumPullReqReviewDecision
  sha: string
  reviewer: Reviewer
  added_by: AddedBy
}

export interface TypesPullReq {
  author?: TypesPrincipalInfo
  closed?: number | null
  created?: number
  description?: string
  edited?: number
  is_draft?: boolean
  merge_base_sha?: string
  merge_check_status?: string
  merge_conflicts?: string[]
  merge_method?: EnumMergeMethod
  merge_target_sha?: string | null
  merged?: number | null
  merger?: TypesPrincipalInfo
  number?: number
  source_branch?: string
  source_repo_id?: number
  source_sha?: string
  state?: EnumPullReqState
  stats?: TypesPullReqStats
  target_branch?: string
  target_repo_id?: number
  title?: string
}

export type EnumMergeMethod = 'merge' | 'rebase' | 'squash'

export type EnumPullReqState = 'closed' | 'merged' | 'open'

export interface TypesPullReqStats {
  additions?: number | null
  commits?: number | null
  conversations?: number
  deletions?: number | null
  files_changed?: number | null
  unresolved_count?: number
}
export type EnumPrincipalType = 'service' | 'serviceaccount' | 'user'

export interface TypesPrincipalInfo {
  created?: number
  display_name?: string
  email?: string
  id?: number
  type?: EnumPrincipalType
  uid?: string
  updated?: number
}