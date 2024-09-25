import React from 'react'
import { SandboxLayout } from '..'
import {
  Button,
  ButtonGroup,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spacer,
  Text,
  Textarea
} from '@harnessio/canary'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface DataProps {
  email?: string
  password?: string
}

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
})

function SandboxRepoCreatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = (data: DataProps) => {
    console.log(data)
  }

  return (
    <>
      <SandboxLayout.Main hasLeftPanel hasHeader>
        <SandboxLayout.Content maxWidth="2xl">
          <Spacer size={10} />
          <Text size={5} weight={'medium'}>
            Create a new repository
          </Text>
          <Spacer size={3} />
          <Text size={2} as="p" className="text-primary/80 max-w-[100%]">
            A repository contains all project files, including the revision history. Already have a project repository
            elsewhere? Import a repository.
          </Text>
          <Spacer size={8} />
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <Label htmlFor="email" variant="sm">
              Name
            </Label>
            <Spacer size={1} />
            <Input id="email" type="email" {...register('email')} placeholder="Enter repository name" autoFocus />
            {errors.email && (
              <>
                <Spacer size={2} />
                <Text size={1} className="text-destructive">
                  {errors.email.message?.toString()}
                </Text>
              </>
            )}
            <Spacer size={8} />
            {/* Description */}
            <Label htmlFor="email" variant="sm">
              Description
            </Label>
            <Spacer size={1} />
            <Textarea id="email" {...register('email')} placeholder="Enter a description of this repository..." />
            {errors.email && (
              <>
                <Spacer size={2} />
                <Text size={1} className="text-destructive">
                  {errors.email.message?.toString()}
                </Text>
              </>
            )}
            <Spacer size={8} />
            {/* .gitignore */}
            <Label htmlFor="email" variant="sm">
              Add a .gitignore
            </Label>
            <Spacer size={2} />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            {errors.email && (
              <>
                <Spacer size={2} />
                <Text size={1} className="text-destructive">
                  {errors.email.message?.toString()}
                </Text>
              </>
            )}
            <Spacer size={8} />
            {/* License */}
            <Label htmlFor="email" variant="sm">
              Choose a license
            </Label>
            <Spacer size={2} />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            {errors.email && (
              <>
                <Spacer size={2} />
                <Text size={1} className="text-destructive">
                  {errors.email.message?.toString()}
                </Text>
              </>
            )}
            <Spacer size={16} />
            {/* Buttons */}
            <ButtonGroup.Root>
              <Button size="sm">Create repository</Button>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </ButtonGroup.Root>
          </form>
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}

export { SandboxRepoCreatePage }
