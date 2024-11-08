import React, { useState } from 'react'
import {
  Button,
  ButtonGroup,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
  Icon,
  Checkbox
} from '@harnessio/canary'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormFieldSet } from '../../index'

const importRepoFormSchema = z.object({
  identifier: z.string().min(1, { message: 'Please provide a name' }),
  description: z.string(),
  pipelines: z.string().optional(),
  provider: z.string().min(1, { message: 'Please select a provider' }),
  password: z.string().optional(),
  organization: z.string().min(1, { message: 'Please select an organization' }),
  repository: z.string().min(1, { message: 'Please select a repository' })
})

export type ImportRepoFormType = z.infer<typeof importRepoFormSchema>

export function ImportRepositoryForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<ImportRepoFormType>({
    resolver: zodResolver(importRepoFormSchema),
    mode: 'onChange',
    defaultValues: {
      identifier: '',
      description: '',
      pipelines: '',
      provider: 'Github',
      password: '',
      organization: '',
      repository: ''
    }
  })

  const providerValue = watch('provider')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const providerOptions = [
    `Github`,
    `Gitlab`,
    `Bitbucket`,
    `Azure DevOps`,
    `Github Enterprise`,
    `Gitlab Self-Hosted`,
    `Bitbucket Server`,
    `Gitea`,
    `Gogs`
  ]

  const handleSelectChange = (fieldName: keyof ImportRepoFormType, value: string) => {
    setValue(fieldName, value, { shouldValidate: true })
  }

  const handleFormSubmit: SubmitHandler<ImportRepoFormType> = data => {
    setIsSubmitting(true)
    setTimeout(() => {
      console.log('Token created:', data)
      reset()
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 2000)
    }, 2000)
  }

  const handleCancel = () => {}

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormFieldSet.Root>
          <FormFieldSet.ControlGroup>
            <FormFieldSet.Label htmlFor="provider" required>
              Provider
            </FormFieldSet.Label>
            <Select value={providerValue} onValueChange={value => handleSelectChange('provider', value)}>
              <SelectTrigger id="provider">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {providerOptions.map(providerOption => {
                  return (
                    <SelectItem key={providerOption} value={providerOption}>
                      {providerOption}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            {errors.provider && (
              <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                {errors.provider.message?.toString()}
              </FormFieldSet.Message>
            )}
          </FormFieldSet.ControlGroup>
        </FormFieldSet.Root>

        {/* NAME */}
        <FormFieldSet.Root>
          <FormFieldSet.ControlGroup>
            <FormFieldSet.Label htmlFor="organization" required>
              Organization
            </FormFieldSet.Label>
            <Input
              id="organization"
              {...register('organization')}
              placeholder="Enter the organization name"
              autoFocus
            />
            {errors.organization && (
              <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                {errors.organization.message?.toString()}
              </FormFieldSet.Message>
            )}
          </FormFieldSet.ControlGroup>
        </FormFieldSet.Root>

        <FormFieldSet.Root>
          <FormFieldSet.ControlGroup>
            <FormFieldSet.Label htmlFor="repository" required>
              Repository
            </FormFieldSet.Label>
            <Input id="repository" {...register('repository')} placeholder="Enter the repository name" autoFocus />
            {errors.repository && (
              <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                {errors.repository.message?.toString()}
              </FormFieldSet.Message>
            )}
          </FormFieldSet.ControlGroup>
        </FormFieldSet.Root>

        <FormFieldSet.Root>
          <FormFieldSet.ControlGroup className="min-h-8 justify-center">
            <FormFieldSet.Option
              control={
                <Checkbox
                // checked={false}
                // onCheckedChange={() => handleCheckboxChange(event.id as WebhookTriggerEnum)}
                // id={`${event.id}`}
                />
              }
              // id={`${event.id}`}
              id="authorization"
              label="Requires Authorization"
            />
          </FormFieldSet.ControlGroup>

          <FormFieldSet.ControlGroup className="min-h-8 justify-center">
            <FormFieldSet.Option
              control={
                <Checkbox
                // checked={false}
                // onCheckedChange={() => handleCheckboxChange(event.id as WebhookTriggerEnum)}
                // id={`${event.id}`}
                />
              }
              // id={`${event.id}`}
              id="pipelines"
              label="Import Pipelines"
            />
          </FormFieldSet.ControlGroup>
        </FormFieldSet.Root>

        {/* SUBMIT BUTTONS */}
        <FormFieldSet.Root>
          <FormFieldSet.ControlGroup>
            <ButtonGroup.Root className="justify-end">
              <>
                <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={!isValid || isSubmitting}>
                  {!isSubmitting ? 'Import Repository' : 'Importing...'}
                </Button>
              </>
            </ButtonGroup.Root>
          </FormFieldSet.ControlGroup>
        </FormFieldSet.Root>
      </form>
    </>
  )
}
