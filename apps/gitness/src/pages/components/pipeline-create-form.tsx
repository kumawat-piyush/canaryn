import React, { useEffect } from 'react'
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@harnessio/canary'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useListBranchesQuery } from '@harnessio/code-service-client'

interface PipelineCreateFormProps {
  onCancel: () => void
  onSubmit: () => void
}

const createPipelineSchema = z.object({
  name: z.string().min(1, { message: 'Pipeline name is required' }),
  branch: z.string().min(1, { message: 'Branch name is required' }),
  yamlPath: z.string().min(1, { message: 'YAML path is required' }),
  storeInGit: z.boolean().optional(),
  cloneRepo: z.boolean().optional()
})

export function PipelineCreateForm({ onCancel, onSubmit }: PipelineCreateFormProps) {
  const form = useForm<z.infer<typeof createPipelineSchema>>({
    resolver: zodResolver(createPipelineSchema),
    defaultValues: {
      name: '',
      branch: 'main',
      yamlPath: ''
    }
  })

  const { data, isLoading } = useListBranchesQuery({ repo_ref: 'MyNewProject/MyRepo/+', queryParams: {} })

  const { watch, setValue } = form

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'name') {
        setValue('yamlPath', value.name ? `.harness/${value.name}.yaml` : '')
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, setValue])

  console.log('form', form)

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Pipeline name*</FormLabel>
                <FormControl>
                  <Input className="text-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storeInGit"
            render={({ field }) => (
              <FormItem className="flex gap-2 space-y-0 items-center">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Store in Git</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="yamlPath"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">YAML path*</FormLabel>
              <FormControl>
                <Input className="text-primary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Branch*</FormLabel>
              <Select
                // 🚨 TODO: Check the type. "content" is not present in types
                disabled={isLoading || !data?.content?.length}
                onValueChange={field.onChange}
                defaultValue={field.value}>
                <FormControl className="text-primary">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a branch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data?.content?.map(branchItem => (
                    <SelectItem value={branchItem?.name}>{branchItem?.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cloneRepo"
          render={({ field }) => (
            <FormItem className="flex gap-2 space-y-0 items-center">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <FormLabel className="underline underline-offset-4 decoration-dotted" htmlFor="cloneRepo">
                      Clone Git Repository
                    </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent className="bg-primary-foreground w-[350px] text-gray-100 border-gray-700">
                    <p>
                      If clone is enabled, Harness will clone your Git Repository automatically when the execution
                      starts.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </FormItem>
          )}
        />
        <div className="flex gap-3 justify-end">
          <Button onClick={onCancel} className="text-primary" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Create Pipeline</Button>
        </div>
      </form>
    </Form>
  )
}
