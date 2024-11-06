import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  ButtonGroup,
  Input,
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
import { useMembershipAddMutation, EnumMembershipRole } from '@harnessio/code-service-client'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset: resetNewMemberForm,
    formState: { errors, isValid },
    watch
  } = useForm<NewMemberFields>({
    resolver: zodResolver(newMemberSchema),
    mode: 'onChange',
    defaultValues: {
      memberName: '',
      role: ''
    }
  })

  // Mutation hook for adding a member
  const { mutate: addMember } = useMembershipAddMutation(
    { space_ref },
    {
      onSuccess: () => {
        console.log('Member added successfully')
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          navigate(`/${space_ref}/sandbox/settings/project/members`, { replace: true })
        }, 2000)
      },
      onError: error => {
        alert('Error adding member: ' + error.message)
        setIsSubmitting(false)
      }
    }
  )

  // Form submit handler
  const onSubmit: SubmitHandler<NewMemberFields> = data => {
    setIsSubmitting(true)
    addMember({ body: { user_uid: data.memberName, role: data.role as EnumMembershipRole } })
  }

  const handleCancel = () => {
    resetNewMemberForm()
    navigate(`/${space_ref}/sandbox/settings/project/members`, { replace: true })
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
              <Input
                id="memberName"
                {...register('memberName')}
                placeholder="Enter Member name"
                disabled={isSubmitting}
              />
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

            {/* Action Buttons */}
            <FormFieldSet.ControlGroup>
              <ButtonGroup.Root>
                {!submitted ? (
                  <>
                    <Button size="sm" type="submit" disabled={!isValid || isSubmitting}>
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
