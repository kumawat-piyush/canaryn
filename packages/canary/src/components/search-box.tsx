import React from 'react'
import { Input } from './input'
import { Icon } from './icon'
import { Text } from './text'
import { cn } from '@/lib/utils'

// Define the TextSize enum
enum TextSize {
  'text-[12px]' = 0,
  'text-xs' = 1,
  'text-sm' = 2,
  'text-base' = 3,
  'text-xl' = 4,
  'text-2xl' = 5,
  'text-3xl' = 6,
  'text-4xl' = 7,
  'text-5xl' = 8,
  'text-6xl' = 9,
  'text-7xl' = 10,
  'text-8xl' = 11,
  'text-9xl' = 12
}

interface SearchBoxProps {
  placeholder: string
  width?: 'full' | 'fixed'
  hasShortcut?: boolean
  shortcutLetter?: string
  textSize?: TextSize
}

function Root({
  textSize = TextSize['text-sm'], // default to 'text-sm'
  placeholder,
  width = 'fixed',
  hasShortcut = false,
  shortcutLetter
}: SearchBoxProps) {
  // Access the enum value directly by converting `textSize` to the correct string.
  const textSizeClass = TextSize[textSize]

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
      <Input
        placeholder={placeholder}
        className={cn('border-input-foreground pl-7', textSizeClass, { 'pr-10': hasShortcut })}
      />
    </div>
  )
}

export { Root }
