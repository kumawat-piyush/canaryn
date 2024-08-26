import React from 'react'
import { Icon, Text, Button } from '@harnessio/canary'
import PlaygroundListSettings from '../components/playground/list-settings'

interface NoDataStateProps {
  listState: string
  setListState: React.Dispatch<React.SetStateAction<string>>
  iconName: 'no-data-folder'
  iconSize?: number
  title: string
  description: string[]
  primaryButtonLabel: string
  secondaryButtonLabel?: string
}

const NoDataState: React.FC<NoDataStateProps> = ({
  listState,
  setListState,
  iconName,
  iconSize = 112,
  title,
  description,
  primaryButtonLabel,
  secondaryButtonLabel
}) => {
  return (
    <div className="w-full h-full flex flex-col gap-6 place-content-center place-items-center">
      <div>
        <Icon name={iconName} size={iconSize} />
      </div>
      <Text size={5} weight="medium">
        {title}
      </Text>
      <div className="flex flex-col">
        {description.map((line, index) => (
          <Text key={index} size={2} weight="normal" className="text-tertiary-background">
            {line}
          </Text>
        ))}
      </div>
      <div className="mt-1.5 flex gap-4">
        <Button size="lg">{primaryButtonLabel}</Button>
        {secondaryButtonLabel && (
          <Button variant="outline" size="lg">
            {secondaryButtonLabel}
          </Button>
        )}
      </div>
      <PlaygroundListSettings listState={listState} setListState={setListState} />
    </div>
  )
}

export default NoDataState
