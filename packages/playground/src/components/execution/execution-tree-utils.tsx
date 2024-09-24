import { TreeViewElement, Status } from '@harnessio/canary'
import { ExecutionState } from '../execution/types'
import { getDuration } from '../../utils/TimeUtils'

interface Step {
  name: string
  status: ExecutionState
  started: number
  stopped: number
}

interface Stage {
  name: string
  status: ExecutionState
  started: number
  stopped: number
  steps?: Step[]
}

interface Execution {
  stages: Stage[]
}

const mapStatus = (status: ExecutionState): Status => {
  switch (status) {
    case ExecutionState.RUNNING:
      return Status.IN_PROGRESS
    case ExecutionState.SUCCESS:
      return Status.SUCCESS
    case ExecutionState.ERROR:
    case ExecutionState.FAILURE:
    case ExecutionState.KILLED:
      return Status.FAILED
    case ExecutionState.PENDING:
      return Status.QUEUED
    case ExecutionState.SKIPPED:
      return Status.SKIPPED
    default:
      return Status.UNKNOWN
  }
}

// Recursively convert a step to TreeViewElement format
const convertStepToTree = (step: Step, id: string): TreeViewElement => {
  return {
    id,
    isSelectable: true,
    name: step.name,
    status: mapStatus(step.status),
    duration: getDuration(step.started, step.stopped),
    children: []
  }
}

// Convert a stage to TreeViewElement format
const convertStageToTree = (stage: Stage, id: string): TreeViewElement => {
  return {
    id,
    isSelectable: true,
    name: stage.name,
    status: mapStatus(stage.status),
    duration: getDuration(stage.started, stage.stopped),
    children: stage.steps ? stage.steps.map((step, index) => convertStepToTree(step, `${id}-step-${index}`)) : []
  }
}

export const convertExecutionToTree = (execution: Execution): TreeViewElement[] => {
  return execution.stages.map((stage, index) => convertStageToTree(stage, `stage-${index}`))
}
