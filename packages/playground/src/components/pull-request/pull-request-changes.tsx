import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Icon,
  StackedList,
  Text
} from '@harnessio/canary'

import PullRequestDiffViewer from './pull-request-diff-viewer'
import { useDiffConfig } from './hooks/useDiffConfig'
import { DiffModeEnum } from '@git-diff-view/react'

interface LineTitleProps {
  text?: string
}

interface DataProps {
  data: string[]
  diffData:
    | {
        oldFile?: {
          fileName?: string | null
          fileLang?: string | null
          content?: string | null
        }
        newFile?: {
          fileName?: string | null
          fileLang?: string | null
          content?: string | null
        }
        hunks: string[]
      }
    | undefined
}

const LineTitle: React.FC<LineTitleProps> = ({ text }) => (
  <div className="flex items-center gap-3 justify-between">
    <div className="inline-flex gap-2 items-center">
      <Text weight="medium">{text}</Text>
      <Button size="sm" variant="ghost">
        <Icon name="clone" size={14} className="text-tertiary-background" />
      </Button>
      <Badge variant="outline" size="sm" theme="success">
        +34
      </Badge>
      <Badge variant="outline" size="sm" theme="destructive">
        -36
      </Badge>
    </div>
    <div className="inline-flex gap-2 items-center"></div>
  </div>
)

const PullRequestAccordion: React.FC<{
  title: string
  data:
    | {
        oldFile?: {
          fileName?: string | null
          fileLang?: string | null
          content?: string | null
        }
        newFile?: {
          fileName?: string | null
          fileLang?: string | null
          content?: string | null
        }
        hunks: string[]
      }
    | undefined
}> = ({ title, data }) => {
  const {
    // mode,
    // setMode,
    highlight,
    // setHighlight,
    wrap,
    //  setWrap,
    fontsize
  } = useDiffConfig()

  // useMemo(()=>{})
  return (
    <StackedList.Root>
      <StackedList.Item disableHover isHeader className="p-0 hover:bg-transparent cursor-default">
        <Accordion type="multiple" className="w-full">
          <AccordionItem isLast value={title}>
            <AccordionTrigger leftChevron className="text-left p-4">
              <StackedList.Field title={<LineTitle text={title} />} />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex border-t w-full p-4">
                <div className="bg-transparent">
                  <PullRequestDiffViewer
                    data={data}
                    fontsize={fontsize}
                    highlight={highlight}
                    mode={DiffModeEnum.Split}
                    wrap={wrap}
                    addWidget
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </StackedList.Item>
    </StackedList.Root>
  )
}

export default function PullRequestChanges({ data, diffData }: DataProps) {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item, index) => (
        <PullRequestAccordion key={index} title={item} data={diffData} />
      ))}
    </div>
  )
}
