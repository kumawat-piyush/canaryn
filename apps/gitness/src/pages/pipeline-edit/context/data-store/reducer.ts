import type { TypesSignature } from '@harnessio/code-service-client'
import { YamlRevision } from '../PipelineStudioDataProvider'
import { DataActionName, DataActions, AddStepIntentionActionPayload } from './actions'

export interface DataReducerState {
  isDirty: boolean
  isExistingPipeline: boolean
  //
  isYamlValid: boolean
  yamlRevision: YamlRevision
  //
  addStepIntention: AddStepIntentionActionPayload
  //
  pipelineLatestAuthor: TypesSignature | null
}

export const initialState: DataReducerState = {
  isDirty: false,
  isExistingPipeline: false,
  //
  isYamlValid: true,
  yamlRevision: { yaml: '' },
  //
  addStepIntention: null,
  //
  pipelineLatestAuthor: null
}

export const DataReducer = (state = initialState, data: DataActions): DataReducerState => {
  const { type, payload } = data
  switch (type) {
    case DataActionName.SetYamlRevision:
      return {
        ...state,
        yamlRevision: payload
      }
    case DataActionName.SetAddStepIntention:
      return {
        ...state,
        addStepIntention: payload
      }
    case DataActionName.SetIsExistingPipeline:
      return {
        ...state,
        isExistingPipeline: payload
      }
    case DataActionName.SetPipelineLatestAuthor:
      return {
        ...state,
        pipelineLatestAuthor: payload
      }
  }
  return state
}
