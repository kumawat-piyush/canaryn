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
import { FormEditMemberDialog } from './form-member-edit-dialog'
import { FormDeleteMemberDialog } from './form-member-delete-dialog'
import { dialogStateReducer, initialDialogState } from './members-reducers/dialog-state-reducers'

interface MembersProps {
  display_name: string
  role: string
  email: string
  timestamp?: string
  avatarUrl?: string
}

interface PageProps {
  members: MembersProps[]
}

export const MembersList = ({ members }: PageProps) => {
  const [dialogState, dispatch] = useReducer(dialogStateReducer, initialDialogState)

  const openDialog = (dialogType: 'edit' | 'delete', member: MembersProps) => {
    dispatch({ type: 'OPEN_DIALOG', dialogType, member })
  }

  const closeDialog = (dialogType: 'edit' | 'delete') => {
    dispatch({ type: 'CLOSE_DIALOG', dialogType })
  }

  // Delete project handler
  const handleDelete = () => {
    dispatch({ type: 'START_DELETING' })

    setTimeout(() => {
      dispatch({ type: 'DELETE_SUCCESS' })
      setTimeout(() => {
        closeDialog('delete')
        dispatch({ type: 'RESET_DELETE' })
      }, 2000)
    }, 2000)
  }

  const handleRoleSave = () => {
    dispatch({ type: 'START_SUBMITTING' })

    setTimeout(() => {
      dispatch({ type: 'SUBMIT_SUCCESS' })
      setTimeout(() => {
        closeDialog('edit')
        dispatch({ type: 'RESET_SUBMIT' })
      }, 2000)
    }, 2000)
  }

  const moreActionsTooltip = ({ member }: { member: MembersProps }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="xs">
            <Icon name="vertical-ellipsis" size={14} className="text-tertiary-background cursor-pointer" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="shadow-sm py-2 bg-primary-background border border-gray-800 rounded-[10px] w-[180px]">
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer" onSelect={() => openDialog('edit', member)}>
              <DropdownMenuShortcut className="ml-0">
                <Icon name="edit-pen" className="mr-2" />
              </DropdownMenuShortcut>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-400 hover:text-red-400 focus:text-red-400"
              onSelect={() => openDialog('delete', member)}>
              <DropdownMenuShortcut className="ml-0">
                <Icon name="trash" className="mr-2 text-red-400" />
              </DropdownMenuShortcut>
              Remove member
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
            <TableHead className="text-primary">Role</TableHead>
            <TableHead className="text-primary">Email</TableHead>
            {members[0]?.timestamp && <TableHead className="text-right text-primary">Date added</TableHead>}
            <TableHead>
              <></>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member, index) => (
            <TableRow key={index}>
              {/* NAME */}
              <TableCell className="content-center my-6">
                <div className="flex items-center gap-4">
                  <Avatar size="10">
                    {member.avatarUrl && <AvatarImage src={member.avatarUrl} />}
                    <AvatarFallback className="text-xs p-1 text-center">
                      {getInitials(member.display_name, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <Text size={2} weight="medium" wrap="nowrap" truncate className="text-primary">
                    {member.display_name}
                  </Text>
                </div>
              </TableCell>
              {/* ROLE */}
              <TableCell className="content-center my-6">
                <div className="flex gap-1.5 items-center">
                  <Text size={2} wrap="nowrap" truncate className="text-tertiary-background">
                    <Badge
                      variant="outline"
                      size="xs"
                      className="rounded-full font-normal text-xs p-2 h-5 text-tertiary-background text-center m-auto bg-tertiary-background/10">
                      {member.role}
                    </Badge>
                  </Text>
                </div>
              </TableCell>
              {/* EMAIL */}
              <TableCell className="content-center my-6">
                <div className="flex gap-1.5">
                  <Text wrap="nowrap" size={1} truncate className="text-tertiary-background">
                    {member.email}
                  </Text>
                </div>
              </TableCell>
              {/* DATE ADDED */}
              {member.timestamp && (
                <TableCell className="content-center">
                  <div className="flex gap-1.5 items-center justify-end">
                    <Text wrap="nowrap" size={1} truncate className="text-tertiary-background text-right">
                      {member.timestamp}
                    </Text>
                  </div>
                </TableCell>
              )}
              <TableCell className="content-center my-6">
                <div className="flex gap-1.5 items-center justify-end">{moreActionsTooltip({ member })}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Delete Dialog */}
      {dialogState.isDialogDeleteOpen && (
        <FormDeleteMemberDialog
          isDeleting={dialogState.isDeleting}
          deleteSuccess={dialogState.deleteSuccess}
          onDelete={handleDelete}
          member={dialogState.deleteMember!}
          onClose={() => {
            closeDialog('delete')
            dispatch({ type: 'RESET_DELETE' })
          }}
        />
      )}
      {/* Edit Dialog */}
      {dialogState.isDialogEditOpen && dialogState.editMember && (
        <FormEditMemberDialog
          member={dialogState.editMember}
          onSave={handleRoleSave}
          onClose={() => {
            closeDialog('edit')
            dispatch({ type: 'RESET_SUBMIT' })
          }}
          isSubmitting={dialogState.isSubmitting}
          submitted={dialogState.submitted}
        />
      )}
    </>
  )
}
