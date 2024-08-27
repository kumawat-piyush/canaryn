import React from 'react'
import { ScrollArea } from '@harnessio/canary'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@harnessio/canary'
import { data } from './mocks/mockInput'

// interface InputTableProps {
//   children: ReactNode
//   name: string
//   value: string
// }

export const InputOutputTable = () => {
  const headKey = data[0].name
  const headValue = data[0].value

  return (
    <ScrollArea className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>{headKey}</TableHeader>
            <TableHeader>{headValue}</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: { name: string; value: string }) => {
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
