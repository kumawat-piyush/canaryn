import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Spacer,
  Text,
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@harnessio/canary'
import { SandboxLayout, FormFieldSet } from '@harnessio/playground'
import { useNavigate } from 'react-router-dom'
import { useGetSpaceURLParam } from '../../framework/hooks/useGetSpaceParam'
import { useMembershipAddMutation, EnumMembershipRole, useListPrincipalsQuery } from '@harnessio/code-service-client'

// Define form schema for new member
const newMemberSchema = z.object({
  memberName: z.string().min(1, { message: 'Please provide a member name' }),
  role: z.string().min(1, { message: 'Please select a role for the new member' })
})

// TypeScript types for form fields
type NewMemberFields = z.infer<typeof newMemberSchema>

// Role options as string values, compatible with the API
const roleOptions = [
  { label: 'Owner', value: 'space_owner' },
  { label: 'Reader', value: 'reader' },
  { label: 'Executor', value: 'executor' },
  { label: 'Contributor', value: 'contributor' }
]

export const CreateNewMemberPage = () => {
  const space_ref = useGetSpaceURLParam()
  const navigate = useNavigate()
  const [selectedMember, setSelectedMember] = useState<string>('') // State to hold selected member
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    handleSubmit,
    setValue,
    reset: resetNewMemberForm,
    formState: { errors },
    watch
  } = useForm<NewMemberFields>({
    resolver: zodResolver(newMemberSchema),
    mode: 'onChange',
    defaultValues: {
      memberName: '',
      role: ''
    }
  })

  // Fetch available members
  // This type in custom hook show: array type but not work here. we can only use string to get api data
  const { data: { body: usersData } = {} } = useListPrincipalsQuery({
    queryParams: {
      page: 1,
      limit: 20,
      type: 'user'
    }
  })

  // Mutation hook for adding a member
  const {
    mutate: addMember,
    isSuccess: submitted,
    isLoading: isSubmitting
  } = useMembershipAddMutation(
    { space_ref },
    {
      onSuccess: () => {
        setApiError(null)
        resetNewMemberForm()
        navigate(`/spaces/${space_ref}/settings/members`, { replace: true })
      },
      onError: error => {
        setApiError(error.message ?? null)
      }
    }
  )

  // Form submit handler
  const onSubmit: SubmitHandler<NewMemberFields> = data => {
    addMember({ body: { user_uid: data.memberName, role: data.role as EnumMembershipRole } })
  }

  // Handle member selection
  const handleMemberSelect = (uid: string, display_name: string) => {
    setSelectedMember(display_name)
    setValue('memberName', uid, { shouldValidate: true })
  }

  const handleCancel = () => {
    resetNewMemberForm()
    navigate(`/spaces/${space_ref}/settings/members`, { replace: true })
  }

  const newMemberRoleValue = watch('role')

  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content maxWidth="2xl">
        <Spacer size={10} />
        <Text size={5} weight="medium">
          Add a new member to {space_ref}
        </Text>
        <Spacer size={6} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormFieldSet.Root>
            {/* New Member Name */}
            <FormFieldSet.ControlGroup>
              <FormFieldSet.Label htmlFor="memberName" required>
                New Member Name
              </FormFieldSet.Label>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex justify-between border rounded-md items-center">
                    <Button variant="ghost">
                      <Text>{selectedMember || 'Select New Member'}</Text>
                    </Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent style={{ width: 'var(--radix-dropdown-menu-trigger-width)' }}>
                  <DropdownMenuLabel>
                    {usersData?.length !== 0 ? (
                      'Available users'
                    ) : (
                      <Text color="tertiaryBackground">No available users</Text>
                    )}
                  </DropdownMenuLabel>
                  {usersData && <DropdownMenuSeparator />}
                  {usersData &&
                    usersData.map(user => {
                      const isSelected = user.uid === selectedMember
                      return (
                        <DropdownMenuItem
                          className="flex justify-between"
                          key={user.uid}
                          onSelect={() => handleMemberSelect(user.uid ?? '', user.display_name ?? '')}>
                          {user.display_name}
                          <div className="w-4">{isSelected && <Icon name="tick" size={12} />}</div>
                        </DropdownMenuItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Register the field for validation */}
              {errors.memberName && (
                <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                  {errors.memberName.message}
                </FormFieldSet.Message>
              )}
            </FormFieldSet.ControlGroup>

            {/* Role Selection */}
            <FormFieldSet.ControlGroup>
              <FormFieldSet.Label htmlFor="role" required>
                Role
              </FormFieldSet.Label>
              <Select
                value={newMemberRoleValue}
                onValueChange={value => setValue('role', value, { shouldValidate: true })}
                disabled={isSubmitting}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map(role => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && (
                <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                  {errors.role.message}
                </FormFieldSet.Message>
              )}
            </FormFieldSet.ControlGroup>
            {apiError && (
              <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>{apiError}</FormFieldSet.Message>
            )}
            {/* Action Buttons */}
            <FormFieldSet.ControlGroup>
              <ButtonGroup.Root>
                {!submitted ? (
                  <>
                    <Button size="sm" type="submit" loading={isSubmitting}>
                      {isSubmitting ? 'Inviting...' : 'Invite New Member'}
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" size="sm" theme="success" className="pointer-events-none">
                    Saved <Icon name="tick" size={14} />
                  </Button>
                )}
              </ButtonGroup.Root>
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
        </form>
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}
