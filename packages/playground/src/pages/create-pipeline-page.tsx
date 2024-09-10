import React from 'react'
import { BoxGrid, Button, Icon, Spacer, SpotlightsBox, Text } from '@harnessio/canary'
import Floating1ColumnLayout from '../layouts/Floating1ColumnLayout'

interface TemplateCardsProps {
  title: string
  logo: React.ReactElement<SVGSVGElement>
  logoClass?: string
  highlightTop?: string
  highlightBottom?: string
}

export function CreatePipelinePage() {
  // TODO: Remove hardcoded hex values
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

  return (
    <Floating1ColumnLayout>
      <Spacer size={12} />
      <Text as="p" size={6} weight="medium">
        Create your pipeline
      </Text>
      <Spacer size={3} />
      <Text as="p" size={2} className="max-w-[50%] text-primary/80">
        It’s very simple to start using Gitness. Allow our AI to create your pipeline based on the code base or start
        from a clean state.
      </Text>
      <BoxGrid.Root topBorder>
        <BoxGrid.Header>
          <div className="flex gap-3 justify-between items-baseline">
            <Text size={3} weight="medium" className="text-primary/80 tracking-normal">
              Don't know where to start? Use a template...
            </Text>
            <Button variant="link" size="sm" className="self-start p-0 text-tertiary-background">
              See all templates&nbsp;
              <Icon name="chevron-down" size={12} className="-rotate-90" />
            </Button>
          </div>
        </BoxGrid.Header>
        <BoxGrid.BoxGroup>
          {templateCards.map((card, index) => (
            <BoxGrid.Box key={index} className="border-none">
              <SpotlightsBox.Root
                highlightTop={card.highlightTop}
                highlightBottom={card.highlightBottom}
                logo={card.logo}
                logoClass={card.logoClass ? card.logoClass : ''}>
                <SpotlightsBox.Content>{card.title}</SpotlightsBox.Content>
              </SpotlightsBox.Root>
            </BoxGrid.Box>
          ))}
        </BoxGrid.BoxGroup>
      </BoxGrid.Root>
    </Floating1ColumnLayout>
  )
}
