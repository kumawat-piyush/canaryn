import React from 'react'
import { Icon, Text, Button, cn } from '@harnessio/canary'
import PlaygroundListSettings from '../components/playground/list-settings'

export interface NoDataStateProps {
  title: string
  iconName?: 'no-data-folder' | 'no-search-magnifying-glass' | 'no-data-merge'
  iconSize?: number
  description: string[]
  primaryButtonLabel?: string
  secondaryButtonLabel?: string
  insideTabView?: boolean
  listState?: string
  setListState?: React.Dispatch<React.SetStateAction<string>>
}

const NoDataState: React.FC<NoDataStateProps> = ({
  listState,
  setListState,
  iconName,
  iconSize = 112,
  title,
  description,
  primaryButtonLabel,
  secondaryButtonLabel,
  insideTabView = false
}) => {
  return (
    <div
      className={cn('w-full h-full flex flex-col place-content-center place-items-center', {
        'py-20 pb-24': insideTabView
      })}>
      {iconName && <Icon name={iconName} size={iconSize} />}
      <div className="flex flex-col gap-4 place-content-center place-items-center ">
        <Text size={5} weight="medium">
          {title}
        </Text>
        {description && (
          <div className="flex flex-col">
            {description.map((line, index) => (
              <Text key={index} size={2} weight="normal" align="center" className="text-tertiary-background">
                {line}
              </Text>
            ))}
          </div>
        )}
        {(primaryButtonLabel || secondaryButtonLabel) && (
          <div className="mt-3.5 flex gap-4">
            <Button size="lg">{primaryButtonLabel}</Button>
            {secondaryButtonLabel && (
              <Button variant="outline" size="lg">
                {secondaryButtonLabel}
              </Button>
            )}
          </div>
        )}
      </div>
      {listState && setListState && <PlaygroundListSettings listState={listState} setListState={setListState} />}
    </div>
  )
}

export default NoDataState
