import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Text } from '@harnessio/canary'
import { Icon } from '@harnessio/canary'
// export interface TokensList {}

// interface PageProps {}

export const ProfileTokensList: React.FC = () => {
  return (
    <Table variant="asStackedList">
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Expiration date</TableHead>
          <TableHead>Created</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {/* <TableCell colSpan={5}>
            <Text as="p" size={2} align="center" color={'tertiaryBackground'} className="text-center w-full">
              There are no personal access tokens associated with this account.
            </Text>
          </TableCell> */}
          <TableCell>
            <Text>test</Text>
          </TableCell>
          <TableCell>
            <div>
              <Icon name="green-dot" />
              <Text>active</Text>
            </div>
          </TableCell>
          <TableCell>Nov 26, 2024</TableCell>
          <TableCell>45 Seconds Ago</TableCell>
          <TableCell>ellipsis</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
