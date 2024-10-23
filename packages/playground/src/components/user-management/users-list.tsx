import React, { useReducer } from 'react'
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@harnessio/canary'
import { getInitials } from '../../utils/utils'
import { FormUserEditDialog } from './form-user-edit-dialog'
import { FormRemoveAdminDialog } from './form-admin-remove-dialog'
import { FormDeleteUserDialog } from './form-user-delete-dialog'
import { FormResetPasswordDialog } from './form-user-reset-password'
import { timeAgo } from '../../utils/utils'
import { dialogStateReducer, initialDialogState } from './user-reducers/dialog-state-reducers'

interface UsersProps {
  admin: boolean
  uid: string
  display_name?: string
  email: string
  created: number
  updated?: number
  avatarUrl?: string
  blocked?: boolean
}

interface PageProps {
  users: UsersProps[]
}

// fix the edit form dialog and mock data and coressponding props
export const UsersList = ({ users }: PageProps) => {
  const [dialogState, dispatch] = useReducer(dialogStateReducer, initialDialogState)

  const openDialog = (dialogType: 'delete' | 'edit' | 'removeAdmin' | 'resetPassword', user: UsersProps) => {
    dispatch({ type: 'OPEN_DIALOG', dialogType, user })
  }

  const closeDialog = (dialogType: 'delete' | 'edit' | 'removeAdmin' | 'resetPassword') => {
    dispatch({ type: 'CLOSE_DIALOG', dialogType })
  }

  // Delete user handler
  const handleDelete = () => {
    dispatch({ type: 'START_DELETING' })

    // Simulate an API call
    setTimeout(() => {
      dispatch({ type: 'DELETE_SUCCESS' })
      setTimeout(() => {
        closeDialog('delete')
        dispatch({ type: 'RESET_DELETE' })
      }, 2000)
    }, 2000)
  }

  //form edit submit
  const handleFormSave = () => {
    dispatch({ type: 'START_SUBMITTING' })

    setTimeout(() => {
      dispatch({ type: 'SUBMIT_SUCCESS' })
      setTimeout(() => {
        closeDialog('edit')
        dispatch({ type: 'RESET_SUBMIT' })
      }, 2000)
    }, 2000)
  }

  // Delete project handler
  const handleRemove = () => {
    dispatch({ type: 'START_REMOVING' })

    setTimeout(() => {
      dispatch({ type: 'REMOVE_SUCCESS' })
      setTimeout(() => {
        closeDialog('removeAdmin')
        dispatch({ type: 'RESET_REMOVE' })
      }, 2000)
    }, 2000)
  }

  // Reset password handler
  const handleReset = () => {
    dispatch({ type: 'START_RESETTING' })
    setTimeout(() => {
      dispatch({ type: 'RESET_PASSWORD_SUCCESS' })
      setTimeout(() => {
        closeDialog('resetPassword')
        dispatch({ type: 'RESET_PASSWORD_RESET' })
      }, 2000)
    }, 2000)
  }

  const moreActionsTooltip = ({ user }: { user: UsersProps }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="xs">
            <Icon name="vertical-ellipsis" size={14} className="text-tertiary-background" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="shadow-sm py-2 bg-primary-background border border-gray-800 rounded-[10px] w-[180px]">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => {
                openDialog('removeAdmin', user)
              }}>
              <DropdownMenuShortcut className="ml-0">
                <Icon name="trash" className="mr-2" />
              </DropdownMenuShortcut>
              Remove Admin
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => {
                openDialog('resetPassword', user)
              }}>
              <DropdownMenuShortcut className="ml-0">
                <Icon name="cog-6" className="mr-2" />
              </DropdownMenuShortcut>
              Reset Password
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => {
                openDialog('edit', user)
              }}>
              <DropdownMenuShortcut className="ml-0">
                <Icon name="edit-pen" className="mr-2" />
              </DropdownMenuShortcut>
              Edit User
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-400 hover:text-red-400 focus:text-red-400"
              onSelect={() => {
                openDialog('delete', user)
              }}>
              <DropdownMenuShortcut className="ml-0">
                <Icon name="trash" className="mr-2 text-red-400" />
              </DropdownMenuShortcut>
              Delete User
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <Table variant="asStackedList">
        <TableHeader>
          <TableRow>
            <TableHead className="text-primary">Name</TableHead>
            <TableHead className="text-primary">Email</TableHead>
            <TableHead className="text-primary">Display Name</TableHead>
            {users[0]?.created && <TableHead className="text-right text-primary">Date added</TableHead>}
            <TableHead>
              <></>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            users.map((user, index) => {
              return (
                <TableRow key={index}>
                  {/* NAME */}
                  <TableCell className="content-center my-6">
                    <div className="flex items-center gap-4">
                      <Avatar size="10">
                        {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
                        <AvatarFallback className="text-xs p-1 text-center">{getInitials(user.uid, 2)}</AvatarFallback>
                      </Avatar>
                      <Text size={2} weight="medium" wrap="nowrap" truncate className="text-primary">
                        {user.display_name}
                        {user.admin && (
                          <Badge
                            variant="outline"
                            size="xs"
                            className="rounded-full font-normal text-xs p-2 h-5 text-tertiary-background text-center m-auto bg-tertiary-background/10 ml-2">
                            Admin
                          </Badge>
                        )}
                      </Text>
                    </div>
                  </TableCell>
                  {/* EMAIL */}
                  <TableCell className="content-center my-6">
                    <div className="flex gap-1.5">
                      <Text wrap="nowrap" size={1} truncate className="text-tertiary-background">
                        {user.email}
                      </Text>
                    </div>
                  </TableCell>

                  {/* displayName */}
                  <TableCell className="content-center my-6">
                    <div className="flex gap-1.5">
                      <Text wrap="nowrap" size={1} truncate className="text-tertiary-background">
                        {user.display_name}
                      </Text>
                    </div>
                  </TableCell>

                  {/* TimeStamp */}
                  <TableCell className="content-center my-6">
                    <div className="flex gap-1.5 items-center justify-end">
                      <Text wrap="nowrap" size={1} truncate className="text-tertiary-background">
                        {timeAgo(user.created)}
                      </Text>
                    </div>
                  </TableCell>

                  <TableCell className="content-center my-6">
                    <div className="flex gap-1.5 items-center justify-end">
                      {/* <Icon name="vertical-ellipsis" size={14} className="text-tertiary-background" /> */}
                      {moreActionsTooltip({ user })}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
      {/* Delete Dialog */}
      {dialogState.isDialogDeleteOpen && (
        <FormDeleteUserDialog
          isDeleting={dialogState.isDeleting}
          deleteSuccess={dialogState.deleteSuccess}
          onDelete={handleDelete}
          user={dialogState.selectedUser!}
          onClose={() => {
            closeDialog('delete')
            dispatch({ type: 'RESET_DELETE' })
          }}
        />
      )}
      {/* Edit Dialog */}
      {dialogState.isDialogEditOpen && (
        <FormUserEditDialog
          isSubmitting={dialogState.isSubmitting}
          submitted={dialogState.submitted}
          user={dialogState.selectedUser!}
          onSave={handleFormSave}
          onClose={() => {
            closeDialog('edit')
            dispatch({ type: 'RESET_SUBMIT' })
          }}
        />
      )}
      {dialogState.isDialogRemoveAdminOpen && (
        <FormRemoveAdminDialog
          isRemoving={dialogState.isRemoving}
          removeSuccess={dialogState.removeSuccess}
          user={dialogState.selectedUser!}
          onRemove={handleRemove}
          onClose={() => {
            closeDialog('removeAdmin')
            dispatch({ type: 'RESET_REMOVE' })
          }}
        />
      )}
      {dialogState.isDialogResetPasswordOpen && (
        <FormResetPasswordDialog
          isResetting={dialogState.isResetting}
          resetSuccess={dialogState.resetSuccess}
          user={dialogState.selectedUser!}
          onReset={handleReset}
          onClose={() => {
            closeDialog('resetPassword')
            dispatch({ type: 'RESET_PASSWORD_RESET' })
          }}
        />
      )}
    </>
  )
}
