import React, { useState } from 'react'
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
  Spacer,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
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
import { timeAgo } from '../../utils/utils'

interface UsersProps {
  admin: boolean
  uid: string
  display_name?: string // Add a default value of undefined
  email: string
  created: number // Add a default value of undefined
  updated?: number
  avatarUrl?: string
  blocked?: boolean
}

interface PageProps {
  users: UsersProps[]
}
// fix the edit form dialog and mock data and coressponding props
export const UsersList = ({ users }: PageProps) => {
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false)
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false)
  const [editUser, setEditUser] = useState<UsersProps | null>(null) // Store user being edited
  //open delete dialog for a specific member
  const openDeleteDialog = () => {
    setIsDialogDeleteOpen(true)
  }

  // Open the edit dialog for a specific member
  const openEditDialog = (user: UsersProps) => {
    setEditUser(user)
    setIsDialogEditOpen(true)
  }

  // Close the edit dialog
  const closeEditDialog = () => {
    setIsDialogEditOpen(false)
  }

  const FormDeleteMemberDialog = () => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    // Delete project handler
    const handleDelete = () => {
      setIsDeleting(true)
      setTimeout(() => {
        setIsDeleting(false)
        setDeleteSuccess(true) // Mark deletion as successful
        setTimeout(() => {
          setIsDialogDeleteOpen(false) // Close the dialog
        }, 2000)
      }, 2000)
    }
    return (
      <AlertDialog open={isDialogDeleteOpen} onOpenChange={setIsDialogDeleteOpen}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently remove your users.</AlertDialogDescription>
          </AlertDialogHeader>
          <Spacer size={3} />
          <AlertDialogFooter>
            {!isDeleting && !deleteSuccess && (
              <AlertDialogCancel onClick={() => setIsDialogDeleteOpen(false)}>Cancel</AlertDialogCancel>
            )}
            {deleteSuccess ? (
              <Button size="default" theme="success" className="self-start pointer-events-none">
                Users removed&nbsp;&nbsp;
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

  const handleFormSave = () => {
    setIsDialogEditOpen(false)
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
            <DropdownMenuItem className="cursor-pointer">
              <DropdownMenuShortcut className="ml-0">
                <Icon name="trash" className="mr-2" />
              </DropdownMenuShortcut>
              Remove Admin
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <DropdownMenuShortcut className="ml-0">
                <Icon name="cog-6" className="mr-2" />
              </DropdownMenuShortcut>
              Reset Password
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => {
                openEditDialog(user)
                setEditUser(user) // Set the clicked member's data
                setIsDialogEditOpen(true) // Open the edit dialog
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
                openDeleteDialog()
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
      {isDialogDeleteOpen && <FormDeleteMemberDialog />}
      {/* Edit Dialog */}
      {isDialogEditOpen && editUser && (
        <FormUserEditDialog user={editUser} onSave={handleFormSave} onClose={closeEditDialog} />
      )}
    </>
  )
}
