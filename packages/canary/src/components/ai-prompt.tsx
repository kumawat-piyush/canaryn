import React from 'react'
import { Input } from './input'
import { Button } from './button'
import { Icon } from './icon'
import { Text } from './text'

interface PageProps {
  placeholder: string
  iconName?: string
}

function AIPrompt({ ...props }: PageProps) {
  const { placeholder, iconName } = props

  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-3 border rounded-full py-0.5 pl-2 pr-1 flex-grow">
        <Input placeholder={placeholder} className="rounded-full border-none flex-grow" />
        <Button variant="outline" size="sm" borderRadius="full">
          {iconName && <Icon name={iconName} size={22} />}
          <Text size={2} className="ml-1">
            Create with AI
          </Text>
        </Button>
      </div>
      <Button variant="outline" size="sm" borderRadius="full">
        Start from scratch
      </Button>
    </div>
  )
}

export { AIPrompt }
