import React from 'react'
import { ScrollArea } from '@harnessio/canary'
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@harnessio/canary'
import { data } from './mocks/mockInput'

// interface InputTableProps {
//   children: ReactNode
//   name: string
//   value: string
// }

export const InputOutputTable = () => {
  const titleKey = data[0].name
  const titleValue = data[0].value

  const dataContent = data.slice(1)

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
