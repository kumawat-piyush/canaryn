import { TreeViewElement, Status } from '@harnessio/canary'
import { ExecutionState } from '../execution/types'

interface Step {
  name: string
  status: ExecutionState
}

interface Stage {
  name: string
  status: ExecutionState
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
    duration: 5,
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
    duration: 10,
    children: stage.steps ? stage.steps.map((step, index) => convertStepToTree(step, `${id}-step-${index}`)) : []
  }
}

export const convertExecutionToTree = (execution: Execution): TreeViewElement[] => {
  return execution.stages.map((stage, index) => convertStageToTree(stage, `stage-${index}`))
}
