import { Meter } from '@harnessio/canary'
import { ExecutionState } from '../components/execution/types'

export const getMeterState = (status?: ExecutionState): Meter.MeterState => {
  switch (status) {
    case ExecutionState.FAILURE:
    case ExecutionState.KILLED:
    case ExecutionState.ERROR:
      return Meter.MeterState.Error
    case ExecutionState.SUCCESS:
      return Meter.MeterState.Success
    case ExecutionState.SKIPPED:
    case ExecutionState.BLOCKED:
      return Meter.MeterState.Warning
    case ExecutionState.UNKNOWN:
    case ExecutionState.PENDING:
    case ExecutionState.WAITING_ON_DEPENDENCIES:
    default:
      return Meter.MeterState.Empty
  }
}
