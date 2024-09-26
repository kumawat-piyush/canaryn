import {
  OpenapiGetContentOutput,
  TypesPipeline,
  TypesSignature,
  findPipeline,
  getContent
} from '@harnessio/code-service-client'
import { DispatchFunc } from '../../../../hooks/useThunkReducer'
import { InlineActionArgsType } from '../../utils/inline-actions'
import { YamlRevision } from '../PipelineStudioDataProvider'
import { DataReducerState } from './reducer'
import { decodeGitContent, normalizeGitRef } from '../../../../utils/git-utils'
import { stringify } from 'yaml'
import { starterPipelineV1 } from '../../utils/pipelines'

export enum DataActionName {
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

export interface AddStepIntentionAction {
  type: DataActionName.SetAddStepIntention
  payload: AddStepIntentionActionPayload
}

export interface IsExistingPipelineAction {
  type: DataActionName.SetIsExistingPipeline
  payload: boolean
}

export interface PipelineLatestAuthor {
  type: DataActionName.SetPipelineLatestAuthor
  payload: TypesSignature | null
}

// action union
export type DataActions = YamlRevisionAction | AddStepIntentionAction | IsExistingPipelineAction | PipelineLatestAuthor

export const pipelineLatestAuthor = ({ author }: { author: TypesSignature | null }): DataActions => {
  return { type: DataActionName.SetPipelineLatestAuthor, payload: author }
}

export const setIsExistingPipelineAction = ({ isExisting }: { isExisting: boolean }): DataActions => {
  return { type: DataActionName.SetIsExistingPipeline, payload: isExisting }
}

export const setYamlRevisionAction = ({
  yamlRevision
}: {
  yamlRevision: YamlRevision
}): ((dispatch: DispatchFunc<DataReducerState, DataActions>, getState: () => DataReducerState) => Promise<void>) => {
  return async (dispatch, getState) => {
    dispatch({ type: DataActionName.SetYamlRevision, payload: yamlRevision })
  }
}

export const setAddStepIntentionAction = ({
  addStepIntention
}: {
  addStepIntention: AddStepIntentionActionPayload
}): ((dispatch: DispatchFunc<DataReducerState, DataActions>, getState: () => DataReducerState) => Promise<void>) => {
  return async (dispatch, getState) => {
    dispatch({ type: DataActionName.SetAddStepIntention, payload: addStepIntention })
  }
}

export const loadPipelineAction = ({
  pipelineId,
  repoRef
}: {
  pipelineId: string
  repoRef: string
}): ((dispatch: DispatchFunc<DataReducerState, DataActions>, getState: () => DataReducerState) => Promise<void>) => {
  return async (dispatch, getState) => {
    let pipelineResponse: TypesPipeline | null = null
    try {
      pipelineResponse = await findPipeline({ pipeline_identifier: pipelineId, repo_ref: repoRef })
    } catch (_ex) {
      // TODO: process error
      return
    }

    let pipelineFileContent: OpenapiGetContentOutput | null = null
    if (pipelineResponse.default_branch) {
      try {
        pipelineFileContent = await getContent({
          path: pipelineResponse.config_path ?? '',
          repo_ref: repoRef,
          queryParams: { git_ref: normalizeGitRef(pipelineResponse.default_branch) ?? '', include_commit: true }
        })
      } catch (_ex) {
        // NOTE: if there is no file we threat as new pipeline
        dispatch(setYamlRevisionAction({ yamlRevision: { yaml: stringify(starterPipelineV1) } }))
        dispatch(setIsExistingPipelineAction({ isExisting: false }))
        return
      }
    }

    dispatch(pipelineLatestAuthor({ author: pipelineFileContent?.latest_commit?.author ?? null }))

    const decodedPipelineYaml = decodeGitContent(pipelineFileContent?.content?.data)

    dispatch(setYamlRevisionAction({ yamlRevision: { yaml: decodedPipelineYaml } }))
    dispatch(setIsExistingPipelineAction({ isExisting: true }))

    // const latestCommitAuthor = useMemo(
    //   () => pipelineYAMLFileContent?.latest_commit?.author ?? null,
    //   [pipelineYAMLFileContent?.latest_commit?.author]
    // )

    // useEffect(() => {
    //   const yaml = decodeGitContent(pipelineYAMLFileContent?.content?.data)
    //   setYamlRevision({ yaml })
    // }, [pipelineYAMLFileContent?.content?.data, setYamlRevision])

    // const response = findPipeline({ pipeline_identifier: pipelineId, repo_ref: repoRef })
    //   const { data: pipelineData, isLoading: fetchingPipeline } = useFindPipelineQuery({
    //     pipeline_identifier: pipelineId,
    //     repo_ref: repoRef
    //   })

    // const {
    //   data: pipelineYAMLFileContent,
    //   isLoading: fetchingPipelineYAMLFileContent,
    //   refetch: fetchPipelineYAMLFileContent
    // } = useGetContentQuery(
    //   {
    //     path: pipelineData?.config_path ?? '',
    //     repo_ref: repoRef,
    //     queryParams: { git_ref: normalizeGitRef(pipelineData?.default_branch) ?? '', include_commit: true }
    //   },
    //   {
    //     enabled: !!pipelineData?.default_branch,
    //     retry: false
    //   }
    // )

    // dispatch({ type: DataActionName.SetAddStepIntention, payload: addStepIntention })
  }
}
