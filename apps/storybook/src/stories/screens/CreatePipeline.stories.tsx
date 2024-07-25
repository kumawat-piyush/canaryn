import React, { useState } from 'react'
import Container from '../../components/layout/container'
import { GitnessNavbar } from '../components/NavBar.stories'
import { GitnessTopBar } from '../components/TopBar.stories'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@harnessio/canary'
import { MagicWandIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { PipelineStudio } from '../../../../../packages/unified-pipeline/src/components/PipelineStudio/PipelineStudio.tsx'
import { getNodesFromPipelineYaml } from '../../../../../packages/unified-pipeline/src/utils/PipelineYamlUtils.ts'
// import pipe_yaml from './demo.yaml'
import {parse} from 'yaml'

export default {
  title: 'Screens/Pipeline',
  parameters: {
    layout: 'fullscreen'
  }
}

const formSchema = z.object({
  prompt: z.string().min(2)
})

export function CreatePipeline() {
  const [state, setState] = useState()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: 'build me a python build pipeline'
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch('http://localhost:3000/api/v1/aiagent/generatePipeline', {
      method: 'POST',
      body: JSON.stringify({
        prompt: values.prompt,
        repo_ref: 'test/uuid'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setState(parse(data.YAML))
      })
  }
console.log({state})
  return (
    <Container.Root>
      <Container.Sidebar>
        <GitnessNavbar />
      </Container.Sidebar>
      <Container.Main>
        <Container.Topbar>
          <GitnessTopBar />
        </Container.Topbar>
        <div className="flex flex-col gap-7 my-7">
          <div className="flex flex-col gap-4 w-[770px] mx-auto">
          <h1 className="text-lg">Create Pipeline</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="AI Prompt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button type="submit" variant={'outline'} className="rounded-full">
                  <MagicWandIcon className="mr-2" /> Create with AI
                </Button>
                <Button variant={'outline'} className="rounded-full">
                  <Pencil1Icon className="mr-2" /> Start from scratch
                </Button>
              </div>
            </form>
          </Form>
          </div>
            {state && <PipelineStudio
              nodes={getNodesFromPipelineYaml(state)}
              onAddNode={() => {}}
              onDeleteNode={() => {}}
              onSelectNode={() => {}}
            />}
        </div>
      </Container.Main>
    </Container.Root>
  )
}
