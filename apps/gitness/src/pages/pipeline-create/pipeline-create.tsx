import { CreatePipelinePage } from '@harnessio/playground'
import CreatePipelineDialog from './PipelineCreateDialog/PipelineCreateDialog'
import { useState } from 'react'

export function PipelineCreate() {
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false)

  const closeSearchDialog = () => {
    setSearchDialogOpen(false)
  }

  return (
    <>
      <CreatePipelineDialog open={isSearchDialogOpen} onClose={closeSearchDialog} />
      <CreatePipelinePage onClickStartFromScratch={() => setSearchDialogOpen(true)} />
    </>
  )
}
