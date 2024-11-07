import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  Spacer,
  useZodForm
} from '@harnessio/canary'
import { useCreateBranchMutation, useListBranchesQuery, UsererrorError } from '@harnessio/code-service-client'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'

interface CreateBranchDialogProps {
  open: boolean
  onClose: () => void
}

interface ICreateBranchForm {
  name: string
  target: string
}

const createBranchFormSchema = z.object({
  name: z.string().min(1, { message: 'Branch name is required' }),
  target: z.string().min(1, { message: 'Base branch is required' })
})

export default function CreateBranchDialog({ open, onClose }: CreateBranchDialogProps) {
  const repoRef = useGetRepoRef()
  const queryClient = useQueryClient()

  const form = useZodForm({
    schema: createBranchFormSchema,
    defaultValues: {
      name: '',
      target: 'main'
    }
  })

  const { data: { body: branches } = {}, isLoading } = useListBranchesQuery({ repo_ref: repoRef, queryParams: {} })
  const { mutateAsync: saveBranch, isLoading: isSaving, error } = useCreateBranchMutation({})

  const onSubmit = async (formValues: ICreateBranchForm) => {
    const { name, target } = formValues

    try {
      await saveBranch({
        repo_ref: repoRef,
        body: { name, target, bypass_rules: false }
      })
      queryClient.invalidateQueries({ queryKey: ['listBranches'] })
      onClose()
    } catch (e) {
      console.log(e, 'error')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px]  bg-primary-background border-border">
        <DialogHeader>
          <DialogTitle>Create Branch</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Spacer size={6} />
          <Form className="space-y-6" form={form} onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Branch name*</FormLabel>
                  <FormControl>
                    <Input className="text-primary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Base Branch*</FormLabel>
                  <Select
                    disabled={isLoading || !branches?.length}
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl className="text-primary">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {branches?.map(branch => <SelectItem value={branch?.name as string}>{branch?.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error ? (
              <Alert variant="destructive">
                /* bypassProtection=true is hardcoded, so it can only throw user error */
                <AlertTitle>Error: {(error as UsererrorError).message}</AlertTitle>
              </Alert>
            ) : null}

            <div className="flex gap-3 justify-end">
              <Button onClick={onClose} className="text-primary" variant="outline" loading={isSaving}>
                Cancel
              </Button>
              <Button type="submit">Create Branch</Button>
            </div>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
