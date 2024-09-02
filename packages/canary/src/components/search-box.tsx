import React from 'react'
import { Input } from './input'
import { Icon } from './icon'
import { Text } from './text'
import { cn } from '@/lib/utils'

interface SearchBoxProps {
  placeholder: string
  width?: 'full' | 'fixed'
  hasShortcut?: boolean
  shortcutLetter?: string
}

function Root({ placeholder, width = 'fixed', hasShortcut = false, shortcutLetter }: SearchBoxProps) {
  return (
    <div className={cn('relative', width === 'full' ? 'w-full' : 'w-96')}>
      <Icon
        name="search"
        size={12}
        className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-tertiary-background"
      />
      {hasShortcut && (
        <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-tertiary-background flex gap-0.5 items-center shadow-border shadow-[0_0_0_1px] rounded-md px-1 opacity-80 hover:opacity-100 ease-in-out duration-100 cursor-pointer">
          <Icon name="apple-shortcut" size={12} />
          <Text size={0} color="tertiaryBackground">
            {shortcutLetter}
          </Text>
        </div>
      )}
      <Input placeholder={placeholder} className={cn('border-input-foreground pl-7', { 'pr-10': hasShortcut })} />
    </div>
  )
}

export { Root }
