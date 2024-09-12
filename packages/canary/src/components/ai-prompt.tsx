import React from 'react'
import { Input } from './input'
interface PageProps {
  placeholder: string
  useAIButton?: React.ReactNode
  useManualButton?: React.ReactNode
}

function AIPrompt({ ...props }: PageProps) {
  const { placeholder, useAIButton, useManualButton } = props

  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-3 border rounded-full py-0.5 pl-2 pr-1 flex-grow">
        <Input placeholder={placeholder} className="rounded-full border-none flex-grow" />
        {useAIButton && <>{useAIButton}</>}
      </div>
      {useManualButton && <>{useManualButton}</>}
    </div>
  )
}

export { AIPrompt }
