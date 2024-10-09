import { SshKeyCreateForm } from './ssh-key-create-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@harnessio/canary'

interface SshKeyCreateDialogProps {
  open: boolean
  onClose: () => void
  handleCreateSshKey: () => void
}

export const SshKeyCreateDialog: React.FC<SshKeyCreateDialogProps> = ({ open, onClose, handleCreateSshKey }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px]  bg-primary-background border-border">
        <DialogHeader>
          <DialogTitle className="text-left">New SSH key</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <SshKeyCreateForm handleCreateSshKey={handleCreateSshKey} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
