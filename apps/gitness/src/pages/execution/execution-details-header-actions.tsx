import { Button } from '@harnessio/canary'
import { useState } from 'react'
import { useCancelExecutionMutation } from '@harnessio/code-service-client'
import RunPipelineDialog from '../run-pipeline-dialog/run-pipeline-dialog'

export interface isPipelineStillExecutingProps {
  isExecuting?: boolean
  pipelineIdentifier: string
  executionNum: string
  repoRef: string
  currentBranch: string
}

const ExecutionDetailsHeaderActions = (props: isPipelineStillExecutingProps): JSX.Element => {
  const { isExecuting, pipelineIdentifier, executionNum, repoRef, currentBranch } = props

  const [openRunPipeline, setOpenRunPipeline] = useState(false)

  const { mutateAsync: cancelExecution } = useCancelExecutionMutation({
    pipeline_identifier: pipelineIdentifier,
    execution_number: executionNum,
    repo_ref: repoRef
  })

  const handleAbort = (): void => {
    cancelExecution({})
      .then(() => {})
      .catch()
  }

  return (
    <>
      <div className="absolute right-0 top-0 w-fit z-50">
        <div className="flex items-center gap-x-3 h-14 px-4">
          {isExecuting ? (
            <Button size="sm" onClick={() => handleAbort()}>
              Abort
            </Button>
          ) : (
            <Button size="sm" onClick={() => setOpenRunPipeline(true)}>
              Run
            </Button>
          )}
        </div>
      </div>
      <RunPipelineDialog
        open={openRunPipeline}
        onClose={() => {
          setOpenRunPipeline(false)
        }}
        pipelineId={pipelineIdentifier}
        branch={currentBranch}
        toExecutions={'../executions'}
      />
    </>
  )
}

export default ExecutionDetailsHeaderActions
