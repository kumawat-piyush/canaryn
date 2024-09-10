import React from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  BreadcrumbLink,
  DropdownMenuContent,
  DropdownMenuItem,
  Icon,
  Avatar,
  AvatarFallback,
  cn
} from '@harnessio/canary'

interface AvatarItemsProps {
  items: string[]
}

const AvatarDropdown = ({ isPrimary, items }: { isPrimary: boolean; items: AvatarItemsProps[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex items-center gap-2 outline-none">
        <Avatar className="w-7 h-7">
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
        {/* Conditionally apply text-primary if this is the only breadcrumb */}
        <BreadcrumbLink
          className={cn('font-medium', { 'text-primary': isPrimary, 'text-navbar-text-secondary': !isPrimary })}>
          test
        </BreadcrumbLink>
        <Icon
          name="chevron-down"
          size={10}
          className={cn({
            'text-primary': isPrimary,
            'text-navbar-text-secondary group-hover:text-primary': !isPrimary
          })}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mt-1.5">
        {items.map((item, index) => (
          <DropdownMenuItem key={index}>{String(item)}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvatarDropdown
