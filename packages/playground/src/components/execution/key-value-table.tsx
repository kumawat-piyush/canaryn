import React from 'react'
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow, Text } from '@harnessio/canary'
import { useExecutionContext, ExecutionContextType } from './execution-context'
interface KeyValueTableProps {
  className?: string
}

export const KeyValueTable: React.FC<KeyValueTableProps> = ({ className }) => {
  const value = useExecutionContext().value as ExecutionContextType['value']

  // not sure if the header needs to be fixed
  return (
    <div className="overflow-x-auto pt-4">
      <Table className={className}>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Text size={2} weight="semibold" className="text-ring">
                titleName
              </Text>
            </TableHead>
            <TableHead>
              <Text size={2} weight="semibold" className="text-ring">
                titleValue
              </Text>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Todo: currently for the simple data, will add more accdordin sec with recursive data */}
          {Array.isArray(value) &&
            value.map((item: { name: string; value: string }, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell className="pt-2.5 pl-4">
                    <Text size={2} weight="normal" className="text-ring">
                      {item.name}
                    </Text>
                  </TableCell>
                  <TableCell className="pt-2.5">
                    <Text size={2} weight="normal" className="text-ring">
                      {item.value}
                    </Text>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}
