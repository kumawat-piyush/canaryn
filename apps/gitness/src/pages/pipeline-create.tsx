import {
  BoxGrid,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Icon,
  Spacer,
  SpotlightsBox,
  Text,
  Toaster,
  useToast
} from '@harnessio/canary'
import { Floating1ColumnLayout } from '@harnessio/playground'
import { useCreatePipelineMutation } from '@harnessio/code-service-client'
import { MagicWand, NavArrowRight } from '@harnessio/icons-noir'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PipelineCreateForm } from './components/pipeline-create-form'
import { CreateFormType } from '../types'

interface TemplateCardsProps {
  title: string
  logo: React.ReactElement<SVGSVGElement>
  logoClass?: string
  highlightTop?: string
  highlightBottom?: string
}

const templateCards: TemplateCardsProps[] = [
  {
    title: 'Node.js',
    logo: <Icon name="node-logo" size={64} />,
    highlightTop: '#3E7644',
    highlightBottom: '#262930'
  },
  {
    title: 'Python',
    logo: <Icon name="python-logo" size={64} />,
    highlightTop: '#4786B8',
    highlightBottom: '#262930'
  },
  {
    title: 'Python and Node.js',
    logo: <Icon name="node-python-logo" size={128} />,
    highlightTop: '#3E7644',
    highlightBottom: '#262930'
  }
]

export default function PipelineCreate() {
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false)

  const { toast } = useToast()

  const navigate = useNavigate()

  const { mutateAsync: savePipeline } = useCreatePipelineMutation({})

  const handleTemplateClick = () => {
    setSearchDialogOpen(true)
  }

  const closeSearchDialog = () => {
    setSearchDialogOpen(false)
  }

  useEffect(() => {
    toast({
      // variant: '',
      description: 'test'
    })
  }, [])

  const onSubmit = async (formValues: CreateFormType) => {
    const { branch, name, yamlPath } = formValues

    try {
      await savePipeline({
        repo_ref: 'MyNewProject/MyRepo/+',
        body: { config_path: yamlPath, default_branch: branch, identifier: name }
      })
      console.log('next')

      // 🚨 TODO: Navigate to the newly created pipeline's edit page after successful creation
      navigate(`/spaceid/repoid/pipelines/${name}/edit`)
    } catch (e) {
      if (e?.message) {
        toast({
          variant: 'destructive',
          description: e?.message
        })
      }
    }
  }

  return (
    <>
      <Dialog open={isSearchDialogOpen} onOpenChange={closeSearchDialog}>
        <DialogContent className="max-w-[500px]  bg-primary-background border-border">
          <DialogHeader>
            <DialogTitle>Create Pipeline</DialogTitle>
            <DialogDescription>
              <Spacer size={6} />
              <PipelineCreateForm onSubmit={onSubmit} onCancel={closeSearchDialog} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Floating1ColumnLayout className="mt-8">
        <Card className="p-8 grid gap-5 place-items-center mb-5">
          <Button className="flex gap-2 items-center" onClick={handleTemplateClick}>
            <Text size={3} className="text-tertiary">
              Start from scratch
            </Text>
            <MagicWand size="16" />
          </Button>
          <Text size={3} as="p">
            Start from Scratch by Clicking the Button Above, or Accelerate Your Pipeline design with One of the
            Pre-Built Templates Below
          </Text>
        </Card>

        {/* <Text as="p" className="my-10">
          or
        </Text> */}

        <div className="flex justify-between">
          <Text size={5} weight={'medium'}>
            Don't know where to start? Use a template
          </Text>

          <Button variant="link" asChild>
            <Link className="flex gap-2 items-center text-primary" to="/pipeline/templates">
              see all templates <NavArrowRight />
            </Link>
          </Button>
        </div>
        <BoxGrid.Root className="border-b border-grey-10 pb-8">
          <BoxGrid.BoxGroup>
            {templateCards.map((card, index) => (
              // Remove this once onClick handler is added to BoxGrid.Box
              <div key={index} onClick={handleTemplateClick}>
                <BoxGrid.Box className="border-none">
                  <SpotlightsBox.Root
                    highlightTop={card.highlightTop}
                    highlightBottom={card.highlightBottom}
                    logo={card.logo}
                    logoClass={card.logoClass ? card.logoClass : ''}>
                    <SpotlightsBox.Content className="text-lg strong font-medium">{card.title}</SpotlightsBox.Content>
                  </SpotlightsBox.Root>
                </BoxGrid.Box>
              </div>
            ))}
          </BoxGrid.BoxGroup>
        </BoxGrid.Root>

        <div className="pt-8 grid grid-cols-2">
          <div>
            <Text className="mb-2" as="p" size={5} weight={'medium'}>
              Resources
            </Text>
            <Text as="p" className="text-tertiary-background mb-6" size={3}>
              Explore more about Gitness and it’s architecture in the documentation.
            </Text>

            <Button className="p-0" variant="link" asChild>
              <Link className="flex gap-2 items-center text-primary" to="/pipeline/templates">
                Read documentation <NavArrowRight />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            <Link to={'/pipelines/create'}>
              <Card>
                <CardContent className="p-5">
                  <div className="grid gap-4 grid-cols-[30px_1fr_30px]">
                    <NavArrowRight />
                    <div className="flex flex-col gap-2">
                      <Text size={4}>Documentation</Text>
                      <Text className="text-tertiary-background">Viverra pellentesque vel Viverra</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to={'/pipelines/create'}>
              <Card>
                <CardContent className="p-5">
                  <div className="grid gap-4 grid-cols-[30px_1fr_30px]">
                    <NavArrowRight />
                    <div className="flex flex-col gap-2">
                      <Text size={4}>Guides</Text>
                      <Text className="text-tertiary-background">Viverra pellentesque vel Viverra</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </Floating1ColumnLayout>
    </>
  )
}
