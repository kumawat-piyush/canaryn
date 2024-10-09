import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Input, Textarea } from '@harnessio/canary'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormFieldSet } from '@harnessio/playground'

const formSchema = z.object({
  identifier: z.string().min(1, { message: 'Please provide a name' }),
  content: z.string().min(1, { message: 'Please add the public key' })
})

export type SshKeyFormType = z.infer<typeof formSchema>

interface SshKeyCreateFormProps {
  onSubmit?: (data: SshKeyFormType) => void
  onCancel?: () => void
  apiError?: string | null
  isLoading?: boolean
  isSuccess?: boolean
  handleCreateSshKey: (data: SshKeyFormType) => void
}

export function SshKeyCreateForm({
  onSubmit = () => {},
  onCancel = () => {},
  apiError = null,
  isLoading = false,
  isSuccess = false,
  handleCreateSshKey
}: SshKeyCreateFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<SshKeyFormType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      identifier: '',
      content: ''
    }
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSelectChange = (fieldName: keyof SshKeyFormType, value: string) => {
    setValue(fieldName, value, { shouldValidate: true })
  }

  //   useEffect(() => {
  //     if (isSuccess === true) {
  //       reset()
  //       setIsSubmitted(true)
  //     }
  //   }, [isSuccess, reset])

  const handleFormSubmit: SubmitHandler<SshKeyFormType> = data => {
    // onSubmit(data)
    console.log(data)
    handleCreateSshKey(data)
  }
  const handleCancel = () => {}

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* NAME */}
        <FormFieldSet.Root>
          <FormFieldSet.ControlGroup>
            <FormFieldSet.Label htmlFor="identifier" required>
              New SSH key
            </FormFieldSet.Label>
            <Input id="identifier" {...register('identifier')} placeholder="Enter the name" autoFocus />
            {errors.identifier && (
              <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                {errors.identifier.message?.toString()}
              </FormFieldSet.Message>
            )}
          </FormFieldSet.ControlGroup>
        </FormFieldSet.Root>

        <FormFieldSet.Root>
          <FormFieldSet.ControlGroup>
            <FormFieldSet.Label htmlFor="content" required>
              Public key
            </FormFieldSet.Label>
            {/* <Input id="content" {...register('content')} autoFocus /> */}
            <Textarea id="content" {...register('content')} />
            {errors.identifier && (
              <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                {errors.identifier.message?.toString()}
              </FormFieldSet.Message>
            )}
          </FormFieldSet.ControlGroup>
        </FormFieldSet.Root>

        {/* SUBMIT BUTTONS */}
        <FormFieldSet.Root>
          <FormFieldSet.ControlGroup>
            <ButtonGroup.Root className="justify-end">
              {!isSubmitted ? (
                <>
                  <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" disabled={!isValid || isLoading}>
                    {!isLoading ? 'Save' : 'Saving...'}
                  </Button>
                </>
              ) : (
                <Button variant="ghost" type="button" size="sm" theme="success" className="pointer-events-none">
                  Generated Token&nbsp;&nbsp;
                  <Icon name="tick" size={14} />
                </Button>
              )}
            </ButtonGroup.Root>
          </FormFieldSet.ControlGroup>
        </FormFieldSet.Root>
      </form>
    </>
  )
}
