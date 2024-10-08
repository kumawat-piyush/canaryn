import { TokenCreateForm } from './token-create-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Spacer } from '@harnessio/canary'

interface TokenCreateDialogProps {
  open: boolean
  onClose: () => void
  handleCreateToken: () => void
}

export const TokenCreateDialog: React.FC<TokenCreateDialogProps> = ({ open, onClose, handleCreateToken }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px]  bg-primary-background border-border">
        <DialogHeader>
          <DialogTitle className="text-left">Create a token</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <TokenCreateForm handleCreateToken={handleCreateToken} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
