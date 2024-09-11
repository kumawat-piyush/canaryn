import React from 'react'
import { Spacer, Text, Section } from '@harnessio/canary'
import Floating1ColumnLayout from '../layouts/Floating1ColumnLayout'

interface PageProps {
  title: string
  byline: string
  sections: SectionProps[]
}

interface SectionProps {
  header?: {
    name: string
    actionText?: string
  }
  content: ContentProps[]
}

interface ContentProps {
  templateBoxes?: TemplateBoxProps[]
  resourceBoxes?: ResourceBoxProps[]
  card?: CardProps
}

interface TemplateBoxProps {
  name: string
  iconName: string
}

interface ResourceBoxProps {
  title: string
  arrowIconName: string
  list: {
    iconName: string
    name: string
    subtitle: string
  }[]
}

interface CardProps {
  title: string
  subtitle: string
  action: string
}

const pageData: PageProps = {
  title: 'Create your pipeline',
  byline:
    "It's very simple to start using Playground. Allow our AI to create your pipeline based on the code base or start from a clean state.",
  sections: [
    {
      header: {
        name: "Don't know where to start? Use a template...",
        actionText: 'See all templates'
      },
      content: [
        {
          templateBoxes: [
            {
              name: 'Node.js',
              iconName: 'harness'
            },
            {
              name: 'Python',
              iconName: 'harness'
            },
            {
              name: 'Python and Node.js',
              iconName: 'harness'
            }
          ]
        }
      ]
    },
    {
      content: [
        {
          card: {
            title: 'Get started quickly',
            subtitle: 'Choose a resource to help you begin',
            action: 'Learn more'
          },
          resourceBoxes: [
            {
              title: 'Documentation',
              arrowIconName: 'chevron-down',
              list: [
                {
                  iconName: 'harness',
                  name: 'Quick start',
                  subtitle: 'Viverra pellentesque vel'
                },
                {
                  iconName: 'harness',
                  name: 'Cloning',
                  subtitle: 'Netus vel purus at ultricies'
                },
                {
                  iconName: 'harness',
                  name: 'Pull requests',
                  subtitle: 'Nec tellus eu turpis'
                }
              ]
            },
            {
              title: 'Guides',
              arrowIconName: 'chevron-down',
              list: [
                {
                  iconName: 'harness',
                  name: 'Matrix strategy',
                  subtitle: 'Viverra pellentesque vel'
                },
                {
                  iconName: 'harness',
                  name: 'Secrets management',
                  subtitle: 'Netus vel purus at ultricies'
                },
                {
                  iconName: 'harness',
                  name: 'Conditional logic',
                  subtitle: 'Nec tellus eu turpis'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

const SectionList = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-8 w-full">{children}</div>
)

export default function CreatePipelinePage() {
  const { title, byline, sections } = pageData

  return (
    <Floating1ColumnLayout>
      <Spacer size={12} />
      <Text as="p" size={6} weight="medium">
        {title}
      </Text>
      <Spacer size={4} />
      <Text as="p" size={2} color="tertiaryBackground" weight="normal" className="max-w-[50%]">
        {byline}
      </Text>
      <Spacer size={6} />
      <SectionList>
        {sections.map(section => (
          <Section.Root>
            {section.header && <Section.Header name={section.header.name} actionText={section.header.actionText} />}
            <Section.Content>
              {section.content.map((contentItem, content_idx) => (
                <>
                  {contentItem.card && <Section.Card {...contentItem.card} key={`card-${content_idx}`} />}
                  {contentItem.resourceBoxes?.map((box, box_idx) => (
                    <Section.ResourceBox {...box} key={`resourceBox-${box_idx}`} />
                  ))}
                  {contentItem.templateBoxes?.map((box, box_idx) => (
                    <Section.TemplateBox {...box} key={`templateBox-${box_idx}`} />
                  ))}
                </>
              ))}
            </Section.Content>
          </Section.Root>
        ))}
      </SectionList>
    </Floating1ColumnLayout>
  )
}
