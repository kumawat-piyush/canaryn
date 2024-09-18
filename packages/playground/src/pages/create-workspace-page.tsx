import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Icon, Text, Spacer } from '@harnessio/canary'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Floating1ColumnLayout } from '../layouts/Floating1ColumnLayout'

interface PageProps {
  isLoading?: boolean
  onFormSubmit: (data: InputProps) => void
}
interface InputProps {
  identifier: string
  description?: string
  is_public?: boolean
  parent_ref?: string
}
//temperate the rule of form validation
const createWorkspaceSchema = z.object({
  identifier: z.string().min(4, { message: 'Workspace name is required, at least enter more than 3 characters in it' })
})

export function CreateWorkspacePage({ isLoading, onFormSubmit }: PageProps) {
  const {
    register,
    handleSubmit, //// react-hook-form's handleSubmit
    formState: { errors }
  } = useForm<InputProps>({
    resolver: zodResolver(createWorkspaceSchema)
  })

  const onSubmit = (data: InputProps) => {
    console.log(data, 'sending data to the parent component')
    onFormSubmit(data)
  }

  return (
    <Floating1ColumnLayout maxWidth="md" verticalCenter>
      <Card variant="plain" width="full">
        <CardHeader>
          <CardTitle className="flex flex-col place-items-center">
            <Icon name="create-workspace" size={112} />
            <Spacer size={4} />
            <Text size={6} weight="medium" color="primary">
              Create new workspace
            </Text>
            <Spacer size={2} />
            <Text size={2} color="tertiaryBackground">
              Organize your projects, pipelines, and more.
            </Text>
          </CardTitle>
        </CardHeader>
        <Spacer size={1} />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="identifier" variant="sm">
              Workspace name
            </Label>
            <Spacer size={1} />
            <Input
              id="identifier"
              id="identifier"
              type="text"
              {...register('identifier', { required: true })}
              placeholder="Enter your workspace name"
              autoFocus
            />
            {errors.identifier && (
              <>
                <Spacer size={2} />
                <Text size={1} className="text-destructive">
                  {errors.identifier.message?.toString()}
                </Text>
              </>
            )}
            <Spacer size={8} />
            <Button variant="default" borderRadius="full" type="submit" loading={isLoading} className="w-full">
              {isLoading ? 'Creating workspace...' : 'Create workspace'}
            </Button>
          </form>
          <Spacer size={4} />
          <Text size={1} color="tertiaryBackground" weight="normal" align="center" className="block">
            Want to use a different account?
            <a className="text-primary">Log out</a>
          </Text>
        </CardContent>
      </Card>
    </Floating1ColumnLayout>
  )
}
