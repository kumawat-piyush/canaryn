import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  Button,
  Icon,
  Spacer
} from '@harnessio/canary'

interface FormDeleteMemberDialogProps {
  onClose: () => void
}

export const FormDeleteMemberDialog: React.FC<FormDeleteMemberDialogProps> = ({ onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  // Delete project handler
  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      setIsDeleting(false)
      setDeleteSuccess(true) // Mark deletion as successful
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
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This will permanently remove your member.</AlertDialogDescription>
        </AlertDialogHeader>
        <Spacer size={3} />
        <AlertDialogFooter>
          {!isDeleting && !deleteSuccess && <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>}
          {deleteSuccess ? (
            <Button size="default" theme="success" className="self-start pointer-events-none">
              Member removed&nbsp;&nbsp;
              <Icon name="tick" size={14} />
            </Button>
          ) : (
            <Button size="default" theme="error" className="self-start" onClick={handleDelete}>
              {isDeleting ? 'Removing Member...' : 'Yes, remove Member'}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
