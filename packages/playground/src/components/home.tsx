import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  Spacer,
  SpotlightsBG,
  Text
} from '@harnessio/canary'
import React from 'react'
import { Link } from 'react-router-dom'

interface HomeProps {
  isAuthed: boolean
}

export default function Home({ ...props }: HomeProps) {
  if (props.isAuthed) {
    return (
      <SpotlightsBG.Root>
        <SpotlightsBG.Content>
          <Text size={6} weight={'medium'} align="center" className="text-primary">
            Canary Playground
          </Text>
          <Spacer size={2} />
          <Text size={3} weight={'normal'} align="center" className="text-tertiary-background">
            Welcome back
          </Text>
          <Spacer size={6} />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="lg">
                Choose your project&nbsp;&nbsp;<Icon name="chevron-down" size={12}></Icon>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {mockProjects &&
                mockProjects.map((project, project_idx) => {
                  return (
                    <DropdownMenuItem key={project_idx} asChild>
                      <Link to="/repos">{project.name}</Link>
                    </DropdownMenuItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </SpotlightsBG.Content>
      </SpotlightsBG.Root>
    )
  }

  return (
    <SpotlightsBG.Root>
      <SpotlightsBG.Content>
        <Text size={6} weight={'medium'} align="center" className="text-primary">
          Canary Playground
        </Text>
        <Spacer size={2} />
        <Text size={3} weight={'normal'} align="center" className="text-tertiary-background">
          The next generation of design at Harness
        </Text>
      </SpotlightsBG.Content>
    </SpotlightsBG.Root>
  )
}
