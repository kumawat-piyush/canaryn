import { OpenapiGetContentOutput, TypesPipeline, TypesPlugin, TypesSignature } from '@harnessio/code-service-client'
import { YamlRevision } from '../PipelineStudioDataProvider'
import { InlineActionArgsType } from '../../utils/inline-actions'

export interface DataReducerState {
  isDirty: boolean
  isExistingPipeline: boolean
  //
  pipelineFileContent: OpenapiGetContentOutput | null
  fetchingPipelineFileContent: boolean
  decodedPipeline?: string
  //
  pipelineData?: TypesPipeline | null
  fetchingPipelineData: boolean
  //
  isYamlValid: boolean
  yamlRevision: YamlRevision
  //
  addStepIntention: AddStepIntentionActionPayload
  editStepIntention: { path: string } | null
  //
  currentStepFormDefinition: TypesPlugin | null
  //
  latestCommitAuthor: TypesSignature | null
}

export enum DataActionName {
  UpdateState = 'Update state',
  SetYamlRevision = 'Set yaml revision',
  SetAddStepIntention = 'Set add step intention',
  SetIsExistingPipeline = 'Set is existing pipeline action',
  SetPipelineLatestAuthor = 'Set pipeline latest author'
}

// yaml revision
export interface YamlRevisionAction {
  type: DataActionName.SetYamlRevision
  payload: YamlRevision
}

//  add step intention
export type AddStepIntentionActionPayload = {
  path: string
  position: InlineActionArgsType['position']
} | null

//  edit step intention
export type EditStepIntentionActionPayload = {
  path: string
} | null

export interface AddStepIntentionAction {
  type: DataActionName.SetAddStepIntention
  payload: AddStepIntentionActionPayload
}

export interface IsExistingPipelineAction {
  type: DataActionName.SetIsExistingPipeline
  payload: boolean
}

export interface PipelineLatestAuthorAction {
  type: DataActionName.SetPipelineLatestAuthor
  payload: TypesSignature | null
}

export interface UpdateStateAction {
  type: DataActionName.UpdateState
  payload: Partial<DataReducerState>
}

export type DataActions =
  | YamlRevisionAction
  | AddStepIntentionAction
  | IsExistingPipelineAction
  | PipelineLatestAuthorAction
  | UpdateStateAction
