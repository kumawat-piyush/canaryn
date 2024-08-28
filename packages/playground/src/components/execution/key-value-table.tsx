import React from 'react'
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow, Text } from '@harnessio/canary'
interface InputTableProps {
  inputData: { name: string; value: string }[]
  className?: string
}

export const KeyValueTable: React.FC<InputTableProps> = ({ inputData, className }) => {
  const titleKey = inputData[0].name
  const titleValue = inputData[0].value

  const dataContent = inputData.slice(1)
  // not sure if the header needs to be fixed
  return (
    <div className="overflow-x-auto pt-4">
      <Table className={className}>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Text size={2} weight="semibold" className="text-ring">
                {titleKey}
              </Text>
            </TableHead>
            <TableHead>
              <Text size={2} weight="semibold" className="text-ring">
                {titleValue}
              </Text>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Todo: currently for the simple data, will add more accdordin sec with recursive data */}
          {dataContent.map((item: { name: string; value: string }) => {
            return (
              <TableRow key={item.name}>
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
