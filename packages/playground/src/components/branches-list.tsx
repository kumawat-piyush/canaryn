import {
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow
} from '@harnessio/canary'
import React, { useState, useEffect } from 'react'
import { getInitials } from '../utils/utils'
import AvatarUrl from '../../public/images/user-avatar.svg'
import copy from 'clipboard-copy'

interface BranchProps {
  // id: string
  name: string
  sha: string
  timestamp: string
  user: {
    name: string
    avatarUrl: string
  }
  checks: {
    done: number
    total: number
    status: number
  }
  behindAhead: {
    behind: number
    ahead: number
  }
  pullRequest: {
    sha: string
    // status: string
  }
}

interface PageProps {
  branches: BranchProps[]
}

const CopyButton = (name: string) => {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    let timeoutId: number
    if (copied) {
      copy(name)
      //stay for 2.5 seconds and then close the tooltip
      setIsOpen(true)
      timeoutId = window.setTimeout(() => {
        setCopied(false)
        setIsOpen(false)
      }, 2500)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [copied, name])

  const tooltipContent = copied ? 'Copied!' : 'Copy the branch name'
  const tooltipTextColor = copied ? 'text-success' : 'text-popover-foreground'
  const iconCopyStyle = copied ? 'text-success' : 'text-tertiary-background'

  return (
    <Tooltip open={isOpen} onOpenChange={open => setIsOpen(open)} delayDuration={0}>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="xs" onClick={() => setCopied(true)}>
          <Icon name={copied ? 'tick' : 'clone'} size={16} className={iconCopyStyle} />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-secondary shadow-sm py-2 text-accent-foreground">
        <Text className={tooltipTextColor}>{tooltipContent}</Text>
        <TooltipArrow offset={5} width={12} height={7} className="fill-accent" />
      </TooltipContent>
    </Tooltip>
  )
}

//waht if I would like to stay the content for the tooltip in the different backfround color?

export const BranchesList = ({ branches }: PageProps) => {
  return (
    <Table variant="asStackedList">
      <TableHeader>
        <TableRow>
          <TableHead>Branch</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead>Check status</TableHead>
          <TableHead className="text-center">Behind | Ahead</TableHead>
          {/* since we don't have the data for pull request, we can temporary hide this column */}
          <TableHead className="hidden">Pull request</TableHead>
          <TableHead>
            <></>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {branches &&
          branches.map(branch => {
            return (
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Text wrap="nowrap" truncate className="text-primary/90">
                      <Button variant="secondary" size="xs">
                        <Icon name="branch" size={11} className="text-tertiary-background" />
                        &nbsp;
                        {branch.name}
                      </Button>
                    </Text>
                    {CopyButton(branch.name)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={branch.user.avatarUrl === '' ? AvatarUrl : branch.user.avatarUrl} />
                      <AvatarFallback className="text-xs p-1 text-center">
                        {getInitials(branch.user.name || '')}
                      </AvatarFallback>
                    </Avatar>
                    <Text wrap="nowrap" truncate className="text-primary">
                      {branch.timestamp}
                    </Text>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1.5 items-center">
                    <Icon name="tick" size={11} className="text-success" />
                    <Text size={2} wrap="nowrap" truncate className="text-tertiary-background">
                      {branch.checks.done} / {branch.checks.total}
                    </Text>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1.5 items-center">
                    <Text wrap="nowrap" truncate className="text-tertiary-background text-center flex-grow">
                      {branch.behindAhead.behind} | {branch.behindAhead.ahead}
                    </Text>
                  </div>
                </TableCell>
                {/* since we don't have the data for pull request, we can temporary hide this column */}
                <TableCell className="hidden">
                  <div className="flex gap-1.5 items-center">
                    <Icon name="open-pr" size={11} className="text-success" />
                    <Text wrap="nowrap" size={1} truncate className="text-tertiary-background">
                      #{branch.sha}{' '}
                    </Text>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1.5 items-center justify-end">
                    <Icon name="vertical-ellipsis" size={14} className="text-tertiary-background" />
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
