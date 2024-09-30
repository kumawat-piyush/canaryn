import React, { createContext, useCallback, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton } from '@harnessio/canary'
import { useYamlEditorContext } from '@harnessio/yaml-editor'
import { OpenapiGetContentOutput, TypesPipeline, TypesSignature } from '@harnessio/code-service-client'
import { Problem } from '@harnessio/playground'
import { countProblems, monacoMarkers2Problems } from '../utils/problems-utils'
import type { YamlProblemSeverity } from '../types/types'
import type { InlineActionArgsType } from '../utils/inline-actions'
import { TypesPlugin } from '../types/api-types'
import useThunkReducer from '../../../hooks/useThunkReducer'
import { DataReducer, initialState } from './data-store/reducer'
import {
  deleteInArrayAction,
  injectInArrayAction,
  loadPipelineAction,
  setYamlRevisionAction,
  updateInArrayAction,
  updateState
} from './data-store/actions'
import { AddStepIntentionActionPayload, EditStepIntentionActionPayload } from './data-store/types'

// TODO: temp interface for params
export interface PipelineParams extends Record<string, string> {
  spaceId: string
  repoId: string
  pipelineId: string
}

export const NEW_PIPELINE_IDENTIFIER = '-1'

export interface YamlRevision {
  yaml: string
  revisionId?: number
}

interface PipelineStudioDataContextProps {
  /** isDirty is true if current pipeline in the editor is different from source pipeline loaded from api */
  isDirty: boolean
  /** isExistingPipeline is true if pipeline exist in the repo  */
  isExistingPipeline: boolean
  /** isYamlValid is tru if there is no syntax or schema errors in the yaml */
  isYamlValid: boolean
  /** current yaml*/
  yamlRevision: YamlRevision
  /** update current yaml. Use to apply pipeline form API or other source. Fro yaml update  use requestYamlModifications*/
  setYamlRevision: (yamlRevision: YamlRevision) => void
  /** yaml syntax of schema errors */
  problems: {
    problems: Problem[]
    problemsCount: Record<YamlProblemSeverity | 'all', number>
  }
  gitInfo: { default_branch: TypesPipeline['default_branch'] }
  // TODO: check if this should be here
  setAddStepIntention: (props: { path: string; position: InlineActionArgsType['position'] }) => void
  clearAddStepIntention: () => void
  addStepIntention: { path: string; position: InlineActionArgsType['position'] } | null
  setEditStepIntention: (props: { path: string }) => void
  clearEditStepIntention: () => void
  editStepIntention: { path: string } | null
  //
  requestYamlModifications: {
    injectInArray: (props: { path: string; position: 'last' | 'after' | 'before' | undefined; item: unknown }) => void
    updateInArray: (props: { path: string; item: unknown }) => void
    deleteInArray: (props: { path: string }) => void
  }
  //
  setCurrentStepFormDefinition: (data: TypesPlugin | null) => void
  currentStepFormDefinition: TypesPlugin | null
  //
  pipelineData?: TypesPipeline | null
  pipelineFileContent?: OpenapiGetContentOutput | null
  fetchPipelineFileContent?: () => void
  fetchingPipelineFileContent?: boolean
  //
  latestCommitAuthor: TypesSignature | null
}

const PipelineStudioDataContext = createContext<PipelineStudioDataContextProps>({
  isDirty: false,
  isExistingPipeline: false,
  isYamlValid: true,
  yamlRevision: { yaml: '', revisionId: 0 },
  setYamlRevision: (_yamlRevision: YamlRevision) => undefined,
  //
  problems: { problems: [], problemsCount: { all: 0, error: 0, info: 0, warning: 0 } },
  gitInfo: { default_branch: '' },
  //
  setAddStepIntention: (_props: { path: string; position: InlineActionArgsType['position'] } | null) => undefined,
  clearAddStepIntention: () => undefined,
  addStepIntention: null,
  //
  setEditStepIntention: (_props: { path: string } | null) => undefined,
  clearEditStepIntention: () => undefined,
  editStepIntention: null,
  //
  requestYamlModifications: {
    injectInArray: (_props: {
      path: string
      position: 'last' | 'after' | 'after' | 'before' | undefined
      item: unknown
    }) => undefined,
    updateInArray: (_props: { path: string; item: unknown }) => undefined,
    deleteInArray: (_props: { path: string }) => undefined
  },
  //
  setCurrentStepFormDefinition: (_data: TypesPlugin | null) => undefined,
  currentStepFormDefinition: null,
  //
  pipelineData: undefined,
  pipelineFileContent: undefined,
  //
  latestCommitAuthor: null
})

const PipelineStudioDataProvider = ({ children }: React.PropsWithChildren) => {
  // TODO: PipelineParams is used temporary
  const { pipelineId = '', repoId, spaceId } = useParams<PipelineParams>()
  const repoRef = useMemo(() => `${spaceId}/${repoId}/+`, [spaceId, repoId])

  const [state, dispatch] = useThunkReducer(DataReducer, initialState)

  const setYamlRevision = useCallback(
    (yamlRevision: YamlRevision) => dispatch(setYamlRevisionAction({ yamlRevision })),
    []
  )

  const fetchPipelineFileContent = useCallback(
    () => dispatch(loadPipelineAction({ pipelineId, repoRef })),
    [pipelineId, repoRef]
  )

  useEffect(() => {
    console.log('ovde 123123')
    dispatch(loadPipelineAction({ pipelineId, repoRef }))
  }, [pipelineId, repoRef])

  const setAddStepIntention = useCallback(
    (addStepIntention: AddStepIntentionActionPayload) => dispatch(updateState({ addStepIntention })),
    []
  )
  const clearAddStepIntention = useCallback(() => dispatch(updateState({ addStepIntention: undefined })), [])

  const setEditStepIntention = useCallback(
    (editStepIntention: EditStepIntentionActionPayload) => dispatch(updateState({ editStepIntention })),
    []
  )
  const clearEditStepIntention = useCallback(() => dispatch(updateState({ editStepIntention: undefined })), [])

  const setCurrentStepFormDefinition = useCallback(
    (currentStepFormDefinition: TypesPlugin | null) => dispatch(updateState({ currentStepFormDefinition })),
    []
  )

  const injectInArray = useCallback(
    (injectData: { path: string; position: 'after' | 'before' | 'last' | undefined; item: unknown }) => {
      dispatch(injectInArrayAction({ injectData }))
    },
    []
  )

  const updateInArray = useCallback((injectData: { path: string; item: unknown }) => {
    dispatch(updateInArrayAction({ injectData }))
  }, [])

  const deleteInArray = useCallback((deleteData: { path: string }) => {
    dispatch(deleteInArrayAction({ deleteData }))
  }, [])

  const requestYamlModifications = useMemo(
    () => ({
      injectInArray,
      deleteInArray,
      updateInArray
    }),
    [injectInArray, deleteInArray, updateInArray]
  )

  const { markers } = useYamlEditorContext()

  const problemsData = useMemo(() => {
    const problems = monacoMarkers2Problems(markers)
    const problemsCount = countProblems(problems)
    return {
      problems,
      problemsCount
    }
  }, [markers])

  const isYamlValid = useMemo(() => problemsData.problemsCount.error === 0, [problemsData])

  if (state.fetchingPipelineData || state.fetchingPipelineFileContent) {
    // TODO: improve loading indicator
    return (
      <div className="flex flex-col flex-1 gap-2 px-4 py-3 h-full items-center justify-center">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-28" />
      </div>
    )
  }

  return (
    <PipelineStudioDataContext.Provider
      value={{
        isDirty: state.isDirty,
        isExistingPipeline: state.isExistingPipeline,
        isYamlValid,
        yamlRevision: state.yamlRevision,
        setYamlRevision,
        problems: problemsData,
        gitInfo: { default_branch: state.pipelineData?.default_branch || '' },
        //
        addStepIntention: state.addStepIntention,
        setAddStepIntention,
        clearAddStepIntention,
        editStepIntention: state.editStepIntention,
        setEditStepIntention,
        clearEditStepIntention,
        //
        /** manipulate  */
        requestYamlModifications,
        //
        currentStepFormDefinition: state.currentStepFormDefinition,
        setCurrentStepFormDefinition,
        //
        pipelineData: state.pipelineData,
        pipelineFileContent: state.pipelineFileContent,
        fetchPipelineFileContent,
        fetchingPipelineFileContent: state.fetchingPipelineFileContent,
        //
        latestCommitAuthor: state.latestCommitAuthor
      }}>
      {children}
    </PipelineStudioDataContext.Provider>
  )
}

export default PipelineStudioDataProvider

export const usePipelineDataContext = () => {
  return React.useContext(PipelineStudioDataContext)
}
