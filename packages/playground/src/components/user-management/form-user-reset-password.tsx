import React, { useState } from 'react'
import {
  Spacer,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  Button,
  Icon
} from '@harnessio/canary'

interface UsersProps {
  uid: string
  display_name?: string // Add a default value of undefined
}

interface FormResetPasswordrDialogProps {
  user: UsersProps | null
  onClose: () => void
}

export const FormResetPasswordDialog: React.FC<FormResetPasswordrDialogProps> = ({ user, onClose }) => {
  const [isResetting, setIsResetting] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
  // Delete project handler
  const handleReset = () => {
    setIsResetting(true)
    setTimeout(() => {
      setIsResetting(false)
      setResetSuccess(true) // Mark deletion as successful
      setTimeout(() => {
        onClose() // Close the dialog
      }, 2000)
    }, 2000)
  }
  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to reset password for {user?.display_name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will send a password reset email to {user?.display_name} ({user?.uid}).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Spacer size={3} />
        <AlertDialogFooter>
          {!isResetting && !resetSuccess && <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>}
          {/* TODO: check the page flow of reset password */}
          {resetSuccess ? (
            <Button size="default" theme="success" className="self-start pointer-events-none">
              Password reset email sent&nbsp;&nbsp;
              <Icon name="tick" size={14} />
            </Button>
          ) : (
            <Button size="default" theme="error" className="self-start" onClick={handleReset}>
              {isResetting ? 'Resetting Password...' : 'Yes, reset Password'}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
