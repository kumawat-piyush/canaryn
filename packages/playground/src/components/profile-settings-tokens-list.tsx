import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Text } from '@harnessio/canary'

// export interface TokensList {}

// interface PageProps {}

export const ProfileTokensList: React.FC<PageProps> = () => {
  return (
    <Table variant="asStackedList">
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Expiration date</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={5}>
            <Text as="p" size={2} align="center" color={'tertiaryBackground'} className="text-center w-full">
              There are no personal access tokens associated with this account.
            </Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
