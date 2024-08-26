import React from 'react'
import NoDataState, { NoDataStateProps } from './no-list-data'

interface NoSearchResultsProps extends Omit<NoDataStateProps, 'iconSize'> {
  iconSize?: number
}

const NoSearchResults: React.FC<NoSearchResultsProps> = ({
  iconName,
  iconSize = 112,
  title,
  description,
  primaryButtonLabel,
  secondaryButtonLabel
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center border rounded-md py-20 pb-24">
      <NoDataState
        iconName={iconName}
        iconSize={iconSize}
        title={title}
        description={description}
        primaryButtonLabel={primaryButtonLabel}
        secondaryButtonLabel={secondaryButtonLabel}
      />
    </div>
  )
}

export default NoSearchResults
