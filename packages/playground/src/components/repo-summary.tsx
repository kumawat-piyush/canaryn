import { Spacer, StackedList, Text } from '@harnessio/canary'
import React from 'react'
import { Link } from 'react-router-dom'

export enum SummaryItemType {
  Folder = 0,
  File = 1
}

interface File {
  id: string
  name: string
  lastCommitMessage: string
  timestamp: string
}

interface PageProps {
  files?: File[]
}

const TopTitle = () => {
  return (
    <Text size={2} weight="normal" color="tertiaryBackground">
      Ted Richardson removing duplicated metrics for servers and swapping to pattern mathematics
    </Text>
  )
}

const Name = ({ title }: { title: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <Text size={2} weight="normal" color="tertiaryBackground">
        {title}
      </Text>
    </div>
  )
}

const Message = ({ title }: { title: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <Text size={2} weight="normal" color="primary" truncate>
        {title}
      </Text>
    </div>
  )
}

const Date = ({ title }: { title: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <Text size={2} weight="normal" color="tertiaryBackground">
        {title}
      </Text>
    </div>
  )
}

// const Description = ({ sha, description, version }: { sha: string; description: string; version: string }) => {
//   return (
//     <div className="flex gap-2 items-center">
//       <div className="ml-[24px] px-1.5 rounded-md flex gap-1 items-center bg-tertiary-background/10">
//         <Icon size={11} name={'tube-sign'} />
//         {sha}
//       </div>
//       <div>{description}</div>
//       <div className="flex gap-1 items-center">
//         <Icon size={11} name={'signpost'} />
//         {version}
//       </div>
//     </div>
//   )
// }

export const Summary = ({ ...props }: PageProps) => {
  const { files } = props

  return (
    <>
      <StackedList.Root>
        <StackedList.Item disableHover>
          <StackedList.Field title={<TopTitle />} />
        </StackedList.Item>
      </StackedList.Root>
      <Spacer size={5} />
      {files && files.length > 0 && (
        <StackedList.Root>
          <StackedList.Item isHeader>
            <StackedList.Field title="Name" />
            <StackedList.Field title="Last commit message" />
            <StackedList.Field right title="Date" />
          </StackedList.Item>
          {files.map((file, file_idx) => (
            <StackedList.Item key={file.name} isLast={files.length - 1 === file_idx} asChild>
              <Link to={`${file.id}`}>
                <StackedList.Field title={<Name title={file.name} />} />
                <StackedList.Field title={<Message title={file.lastCommitMessage} />} />
                <StackedList.Field right title={<Date title={file.timestamp} />} />
              </Link>
            </StackedList.Item>
          ))}
        </StackedList.Root>
      )}
    </>
  )
}
