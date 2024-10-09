import React, { useState, useEffect } from 'react'
import {
  Button,
  ButtonGroup,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text
} from '@harnessio/canary'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormFieldSet } from '@harnessio/playground'

const formSchema = z.object({
  identifier: z.string().min(1, { message: 'Please provide a name' }),
  lifetime: z.string().min(1, { message: 'Please select an expiration' })
})

export type TokenFormType = z.infer<typeof formSchema>

const expirationOptions = [
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '60', label: '60 days' },
  { value: '90', label: '90 days' },
  { value: 'never', label: 'Never' }
]

interface TokenCreateFormProps {
  onSubmit?: (data: TokenFormType) => void
  onCancel?: () => void
  apiError?: string | null
  isLoading?: boolean
  isSuccess?: boolean
  handleCreateToken: (data: TokenFormType) => void
}

export function TokenCreateForm({
  onSubmit = () => {},
  onCancel = () => {},
  apiError = null,
  isLoading = false,
  isSuccess = false,
  handleCreateToken
}: TokenCreateFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<TokenFormType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      identifier: ''
    }
  })

  const expirationValue = watch('lifetime')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSelectChange = (fieldName: keyof TokenFormType, value: string) => {
    setValue(fieldName, value, { shouldValidate: true })
  }

  //   useEffect(() => {
  //     if (isSuccess === true) {
  //       reset()
  //       setIsSubmitted(true)
  //     }
  //   }, [isSuccess, reset])

  const handleFormSubmit: SubmitHandler<TokenFormType> = data => {
    // onSubmit(data)
    console.log(data)
    handleCreateToken(data)
  }
  const handleCancel = () => {}

  const calculateExpirationDate = (lifetime: string): string => {
    if (lifetime === 'never') return ''

    const days = parseInt(lifetime, 10)
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + days)

    return expirationDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* NAME */}
        <FormFieldSet.Root>
          <FormFieldSet.ControlGroup>
            <FormFieldSet.Label htmlFor="identifier" required>
              Name
            </FormFieldSet.Label>
            <Input id="identifier" {...register('identifier')} placeholder="Enter token name" autoFocus />
            {errors.identifier && (
              <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                {errors.identifier.message?.toString()}
              </FormFieldSet.Message>
            )}
          </FormFieldSet.ControlGroup>
        </FormFieldSet.Root>

        <FormFieldSet.Root className="mb-2">
          <FormFieldSet.ControlGroup>
            <FormFieldSet.Label htmlFor="lifetime" required>
              Expiration
            </FormFieldSet.Label>
            <Select value={expirationValue} onValueChange={value => handleSelectChange('lifetime', value)}>
              <SelectTrigger id="lifetime">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {expirationOptions.map(expirationOption => {
                  return <SelectItem value={expirationOption.value}>{expirationOption.label}</SelectItem>
                })}
              </SelectContent>
            </Select>
            {errors.lifetime && (
              <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                {errors.lifetime.message?.toString()}
              </FormFieldSet.Message>
            )}
          </FormFieldSet.ControlGroup>
        </FormFieldSet.Root>

        {/* Expiration Info */}
        {isValid && (
          <FormFieldSet.Root className="mb-4">
            <FormFieldSet.ControlGroup>
              {watch('lifetime') === 'never' ? (
                <Text color="tertiaryBackground">Token will never expire</Text>
              ) : (
                <Text color="tertiaryBackground">
                  Token will expire on {calculateExpirationDate(watch('lifetime'))}
                </Text>
              )}
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
        )}

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
                    {!isLoading ? 'Generate Token' : 'Generating Token...'}
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
