import React, { useState } from 'react'
import {
  Spacer,
  Text,
  ListActions,
  SearchBox,
  Button,
  PaginationContent,
  ListPagination,
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@harnessio/canary'

import {
  SandboxLayout,
  SkeletonList,
  NoData,
  MembersList,
  FormEditMemberDialog,
  FormDeleteMemberDialog
} from '@harnessio/playground'
import {
  useMembershipListQuery,
  TypesMembershipUser,
  EnumMembershipRole,
  MembershipListOkResponse
} from '@harnessio/code-service-client'
import { useGetSpaceURLParam } from '../../framework/hooks/useGetSpaceParam'
import { useNavigate } from 'react-router-dom'
import { usePagination } from '../../framework/hooks/usePagination'
import { timeAgoFromEpochTime } from '../pipeline-edit/utils/time-utils'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]

//TODO: Sort filter, not result data
const ProjectSettingsMemebersPage = () => {
  // lack of data: total members
  // hardcoded
  const totalPages = 10
  const navigate = useNavigate()
  const space_ref = useGetSpaceURLParam()
  const { currentPage, previousPage, nextPage, handleClick } = usePagination(1, totalPages)
  const [totalMembers, setTotalMembers] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [dialogState, setDialogState] = useState({
    isDialogEditOpen: false,
    isDialogDeleteOpen: false,
    selectedMember: null as { display_name: string; role: string; email: string } | null
  })

  const { isLoading, data: members } = useMembershipListQuery(
    { space_ref: space_ref ?? '', queryParams: { page: currentPage, limit: 30 } },
    {
      onSuccess: (data: MembershipListOkResponse) => {
        setTotalMembers(data.length) // Update total members count
      }
      //TO DO: handle error
      //const errorMessage = err?.message || 'An unknown error occurred.'
    }
  )

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      setIsDeleting(false)
      setDialogState(prev => ({ ...prev, isDialogDeleteOpen: false, selectedMember: null }))
    }, 2000)
  }

  const handleRoleSave = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setDialogState(prev => ({ ...prev, isDialogEditOpen: false, selectedMember: null }))
    }, 2000)
  }

  const renderMemberListContent = () => {
    if (isLoading) return <SkeletonList />
    if (!members?.length) {
      return (
        //add this layout to target the content in the center of the page without header and subheader
        <SandboxLayout.Main hasLeftPanel>
          <SandboxLayout.Content maxWidth="3xl" className="h-screen">
            <NoData
              iconName="no-data-members"
              title="No Members yet"
              description={['Add your first team members by inviting them to join this project.']}
              primaryButton={{ label: 'Invite new members' }}
            />
          </SandboxLayout.Content>
        </SandboxLayout.Main>
      )
    }

    return (
      <>
        <MembersList
          members={members.map((member: TypesMembershipUser) => ({
            display_name: member.principal?.display_name ?? '',
            role: member.role as EnumMembershipRole | string,
            email: member.added_by?.email ?? '',
            avatarUrl: '',
            timestamp: member.created ? timeAgoFromEpochTime(member.created) : 'no time available'
          }))}
          onEdit={member =>
            setDialogState({
              ...dialogState,
              isDialogEditOpen: true,
              selectedMember: {
                display_name: member.display_name,
                role: member.role === 'space_owner' ? 'Owner' : member.role,
                email: member.email
              }
            })
          }
          onDelete={member =>
            setDialogState({
              ...dialogState,
              isDialogDeleteOpen: true,
              selectedMember: member
            })
          }
        />
        {/* TODO Delete Dialog: error & delete updated*/}
        {dialogState.isDialogDeleteOpen && dialogState.selectedMember && (
          <FormDeleteMemberDialog
            isDeleting={isDeleting}
            deleteSuccess={!isDeleting}
            member={{ ...dialogState.selectedMember, email: dialogState.selectedMember.email }} // Add the 'email' property
            onDelete={handleDelete}
            onClose={() => setDialogState(prev => ({ ...prev, isDialogDeleteOpen: false }))}
          />
        )}

        {/* TODO: Edit Dialog: error & edit updated*/}
        {dialogState.isDialogEditOpen && dialogState.selectedMember && (
          <FormEditMemberDialog
            isSubmitting={isSubmitting}
            submitted={!isSubmitting}
            member={dialogState.selectedMember}
            onSave={handleRoleSave}
            onClose={() => setDialogState(prev => ({ ...prev, isDialogEditOpen: false }))}
          />
        )}
      </>
    )
  }

  const handleInviteClick = () => {
    navigate(`${space_ref}/sandbox/settings/project/create-new-member`)
  }

  const membersExist = (members?.length ?? 0) > 0

  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content maxWidth="3xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Team
        </Text>
        <Text size={5} weight={'medium'} color="tertiaryBackground">
          , {totalMembers ? `${totalMembers} members` : ''}
        </Text>
        <Spacer size={6} />
        <ListActions.Root>
          <ListActions.Left>
            <SearchBox.Root placeholder="Search Members" />
          </ListActions.Left>
          <ListActions.Right>
            <ListActions.Dropdown title="All Team Roles" items={filterOptions} />
            <ListActions.Dropdown title="Last added" items={sortOptions} />
            <Button variant="default" onClick={handleInviteClick}>
              Invite New Members
            </Button>
          </ListActions.Right>
        </ListActions.Root>
        <Spacer size={5} />
        {renderMemberListContent()}
        <Spacer size={8} />
        {membersExist && (
          <ListPagination.Root>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    size="sm"
                    href="#"
                    onClick={() => currentPage > 1 && previousPage()}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      size="sm_icon"
                      href="#"
                      onClick={() => handleClick(index + 1)}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    size="sm"
                    href="#"
                    onClick={() => currentPage < totalPages && nextPage()}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </ListPagination.Root>
        )}
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { ProjectSettingsMemebersPage }
