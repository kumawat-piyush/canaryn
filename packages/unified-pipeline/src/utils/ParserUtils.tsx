import React from 'react'
import { get, has } from 'lodash-es'
import { Node } from '../components/Canvas/types'
import { StageCategory } from '../components/PipelineConfigPanel/types'
import { getIdFromName } from './StringUtils'
import Bitbucket from '../icons/Bitbucket'
import Slack from '../icons/Slack'

const STAGE_LABEL = 'Stage'
const STAGE_GROUP_LABEL = 'Stage Group'
const STEP_GROUP_LABEL = 'Step Group'
/* Prefixes */
const STAGES_PATH_PREFIX = 'stages'
export const PIPELINE_STAGES_PATH_PREFIX = `pipeline.${STAGES_PATH_PREFIX}`
export const STEPS_PATH_PREFIX = 'steps'
export const GROUP_PATH_PREFIX = 'group'
export const PARALLEL_PATH_PREFIX = 'parallel'

export const parsePipelineYaml = ({
  yamlObject,
  pathPrefix = '',
  isParallel = false
}: {
  yamlObject: string | Record<string, any>
  pathPrefix?: string
  isParallel?: boolean
}): Node[] => {
  const stages = get(yamlObject, pathPrefix, [])
  if (!Array.isArray(stages)) return []
  const collectedNodes: Node[] = []
  stages.forEach((stage, index) => {
    const category = has(stage, GROUP_PATH_PREFIX)
      ? StageCategory.GROUP
      : has(stage, PARALLEL_PATH_PREFIX)
        ? StageCategory.PARALLEL
        : StageCategory.UNIT

    const newPathPrefix = `${pathPrefix}.${index}`

    if (category === StageCategory.GROUP) {
      const groupMembers = parsePipelineYaml({
        yamlObject: get(stage, GROUP_PATH_PREFIX, []),
        pathPrefix: STAGES_PATH_PREFIX
      })
      collectedNodes.push(
        getStageGroupNode({
          stageGroup: stage,
          stageNodes: groupMembers,
          stageGroupIdx: index,
          stageGroupNodePathPrefix: newPathPrefix
        })
      )
    } else if (category === StageCategory.PARALLEL) {
      const parallelMembers = parsePipelineYaml({
        yamlObject: get(stage, PARALLEL_PATH_PREFIX, []),
        pathPrefix: STAGES_PATH_PREFIX,
        isParallel: true
      })
      collectedNodes.push(
        getStageGroupNode({
          stageGroup: stage,
          stageNodes: parallelMembers,
          stageGroupIdx: index,
          stageGroupNodePathPrefix: newPathPrefix
        })
      )
    } else {
      collectedNodes.push(
        getStageNode({
          stage,
          stageIdx: index,
          childNodes: getChildNodes(stage),
          stagePathPrefix: pathPrefix,
          isParallel
        })
      )
    }
  })
  return collectedNodes
}

const getStageGroupNode = ({
  stageGroup,
  stageNodes,
  stageGroupIdx,
  stageGroupNodePathPrefix
}: {
  stageGroup: Record<string, any>
  stageNodes: Node[]
  stageGroupIdx: number
  stageGroupNodePathPrefix: string
}): Node => {
  const stepGroupName = get(stageGroup, 'name', `${STAGE_GROUP_LABEL} ${stageGroupIdx}`)
  const stageGroupId = getIdFromName(stepGroupName)
  return {
    name: stepGroupName,
    path: stageGroupNodePathPrefix,
    icon: null,
    children: stageNodes,
    deletable: true,
    expandable: true,
    groupId: stageGroupId
  } as Node
}

const getStageNode = ({
  stage,
  stageIdx,
  childNodes,
  stagePathPrefix,
  isParallel
}: {
  stage: Record<string, any>
  stageIdx: number
  childNodes: Node[]
  stagePathPrefix: string
  isParallel?: boolean
}): Node => {
  return {
    name: get(stage, 'name') || `${STAGE_LABEL} ${stageIdx}`,
    path: `${stagePathPrefix}.${stageIdx}`,
    icon: null,
    children: childNodes,
    deletable: true,
    expandable: true,
    ...(isParallel && { parallel: isParallel })
  } as Node
}

const getChildNodes = (stage: Record<string, any>): Node[] => {
  const steps = get(stage, STEPS_PATH_PREFIX, [])
  let childNodes: Node[] = []
  if (Array.isArray(steps) && steps.length > 0) {
    childNodes = steps.map((step: Record<string, any>, stepIndex: number) => getStepNode(step, stepIndex))
  }
  return childNodes
}

const getStepNode = (step: Record<string, any>, stepIndex: number): Node => {
  return {
    name: get(step, 'name', `step ${stepIndex + 1}`),
    icon: getPlaceholderIcon(stepIndex),
    expandable: false,
    path: '',
    deletable: false
  } as Node
}

const getPlaceholderIcon = (stepIndex: number): React.ReactElement => {
  return stepIndex % 2 ? <Bitbucket /> : <Slack />
}

/* Parser Utils for V0 pipeline yaml */

const V0_STEPS_PATH_PREFIX = 'stage.spec.execution.steps'

export const parseV0PipelineYaml = ({
  yamlObject,
  pathPrefix = '',
  isParallel = false
}: {
  yamlObject: string | Record<string, any>
  pathPrefix?: string
  isParallel?: boolean
}): Node[] => {
  const stages = pathPrefix.length ? get(yamlObject, pathPrefix, []) : yamlObject
  if (!Array.isArray(stages)) return []
  const collectedNodes: Node[] = []

  stages.forEach((stage, index) => {
    const category = has(stage, PARALLEL_PATH_PREFIX) ? StageCategory.PARALLEL : StageCategory.UNIT

    if (category === StageCategory.PARALLEL) {
      const newPathPrefix = pathPrefix.length ? `${pathPrefix}.${index}` : `${index}`
      const parallelMembers = parseV0PipelineYaml({
        yamlObject: get(stage, PARALLEL_PATH_PREFIX, []),
        pathPrefix: '',
        isParallel: true
      })
      collectedNodes.push(
        getStageGroupNode({
          stageGroup: stage,
          stageNodes: parallelMembers,
          stageGroupIdx: index,
          stageGroupNodePathPrefix: newPathPrefix
        })
      )
    } else {
      // now this is a standalone stage with some steps
      collectedNodes.push(
        getV0StageNode({
          stage,
          stageIdx: index,
          childNodes: getChildNodesOfV0Stage(stage),
          stagePathPrefix: pathPrefix,
          isParallel
        })
      )
    }
  })
  return collectedNodes
}

const getV0StageNode = ({
  stage,
  stageIdx,
  childNodes,
  stagePathPrefix,
  isParallel
}: {
  stage: Record<string, any>
  stageIdx: number
  childNodes: Node[]
  stagePathPrefix: string
  isParallel?: boolean
}): Node => {
  return {
    name: get(stage, 'stage.name') || `${STAGE_LABEL} ${stageIdx}`,
    path: `${stagePathPrefix}.${stageIdx}`,
    icon: null,
    children: childNodes,
    deletable: true,
    expandable: true,
    ...(isParallel && { parallel: isParallel })
  } as Node
}

const getChildNodesOfV0Stage = (stage: Record<string, any>): Node[] => {
  const steps = get(stage, V0_STEPS_PATH_PREFIX, [])
  let childNodes: Node[] = []
  if (Array.isArray(steps) && steps.length > 0) {
    steps.forEach((stepOrParallel: Record<string, any>, stepIndex: number) => {
      if (has(stepOrParallel, PARALLEL_PATH_PREFIX)) {
        const parallelNodes = parseV0ParallelSteps({
          yamlObject: stepOrParallel,
          pathPrefix: PARALLEL_PATH_PREFIX,
          isParallel: true
        })
        childNodes.push(
          getV0StepGroupNode({
            stepGroup: stepOrParallel,
            stepNodes: parallelNodes,
            stepGroupIdx: stepIndex,
            stepGroupNodePathPrefix: `${V0_STEPS_PATH_PREFIX}.${stepIndex}`
          })
        )
      } else {
        childNodes.push(getV0StepNode(stepOrParallel, stepIndex))
      }
    })
  }
  return childNodes
}

export const parseV0ParallelSteps = ({
  yamlObject,
  isParallel = false
}: {
  yamlObject: string | Record<string, any>
  pathPrefix?: string
  isParallel?: boolean
}): Node[] => {
  let childNodes: Node[] = []
  const steps = get(yamlObject, PARALLEL_PATH_PREFIX, [])
  if (Array.isArray(steps) && steps.length > 0) {
    steps.forEach((step: Record<string, any>, stepIndex: number) => {
      childNodes.push(getV0StepNode(step, stepIndex, isParallel))
    })
  }
  return childNodes
}

const getV0StepGroupNode = ({
  stepGroup,
  stepNodes,
  stepGroupIdx,
  stepGroupNodePathPrefix
}: {
  stepGroup: Record<string, any>
  stepNodes: Node[]
  stepGroupIdx: number
  stepGroupNodePathPrefix: string
}): Node => {
  const stepGroupName = get(stepGroup, 'name', `${STEP_GROUP_LABEL} ${stepGroupIdx}`)
  const stepGroupId = getIdFromName(stepGroupName)
  return {
    name: stepGroupName,
    path: stepGroupNodePathPrefix,
    icon: null,
    children: stepNodes,
    deletable: true,
    expandable: true,
    groupId: stepGroupId
  } as Node
}

const getV0StepNode = (step: Record<string, any>, stepIndex: number, isParallel?: boolean): Node => {
  return {
    name: get(step, 'step.name', `step ${stepIndex + 1}`),
    icon: getPlaceholderIcon(stepIndex),
    expandable: false,
    path: '',
    deletable: false,
    ...(isParallel && { parallel: isParallel })
  } as Node
}
