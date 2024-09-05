import {
  Spacer,
  StackedList,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text
} from '@harnessio/canary'
import React from 'react'

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
      <Table variant="asStackedList">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Last commit message</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        {files && files.length > 0 && (
          <TableBody>
            {files.map(file => (
              <TableRow key={file.id}>
                <TableCell>
                  <Text color="tertiaryBackground">{file.name}</Text>
                </TableCell>
                <TableCell>
                  <Text color="primary">{file.lastCommitMessage}</Text>
                </TableCell>
                <TableCell>
                  <Text color="tertiaryBackground" className="text-nowrap">
                    {file.timestamp}
                  </Text>
                </TableCell>
              </TableRow>
            ))}{' '}
          </TableBody>
        )}
      </Table>
    </>
  )
}
