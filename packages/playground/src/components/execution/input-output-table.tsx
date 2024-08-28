import React from 'react'
import { ScrollArea } from '@harnessio/canary'
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow, Text } from '@harnessio/canary'
interface InputTableProps {
  inputData: { name: string; value: string }[]
  className?: string
}

export const InputOutputTable: React.FC<InputTableProps> = ({ inputData, className }) => {
  const titleKey = inputData[0].name
  const titleValue = inputData[0].value

  const dataContent = inputData.slice(1)

  return (
    <ScrollArea className="overflow-x-auto pt-4">
      <Table className={className}>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Text size={3} weight="bold" style={{ color: '#fff' }}>
                {titleKey}
              </Text>
            </TableHead>
            <TableHead>
              <Text size={3} weight="bold" style={{ color: '#fff' }}>
                {titleValue}
              </Text>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataContent.map((item: { name: string; value: string }) => {
            return (
              <TableRow key={item.name}>
                <TableCell className="pt-2.5 pl-4">{item.name}</TableCell>
                <TableCell className="pt-2.5 pl-4">{item.value}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
