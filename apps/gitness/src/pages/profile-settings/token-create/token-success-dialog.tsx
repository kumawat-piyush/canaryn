import React from 'react'
import { TokenSuccessForm } from './token-success-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@harnessio/canary'

interface TokenCreateDialogProps {
  open: boolean
  onClose: () => void
  tokenData: any
}

export const TokenSuccessDialog: React.FC<TokenCreateDialogProps> = ({ open, onClose, tokenData }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px]  bg-primary-background border-border">
        <DialogHeader>
          <DialogTitle className="text-left">Create a token</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <TokenSuccessForm defaultValues={tokenData} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
