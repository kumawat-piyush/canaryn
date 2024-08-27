import React from 'react'
import { ScrollArea } from '@harnessio/canary'
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@harnessio/canary'

interface InputTableProps {
  inputData: { name: string; value: string }[]
}

export const InputOutputTable: React.FC<InputTableProps> = ({ inputData }) => {
  const titleKey = inputData[0].name
  const titleValue = inputData[0].value

  const dataContent = inputData.slice(1)

  return (
    <ScrollArea className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{titleKey}</TableHead>
            <TableHead>{titleValue}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataContent.map((item: { name: string; value: string }) => {
            return (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.value}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
