import React from 'react'
import NoDataState, { NoDataStateProps } from './no-list-data'

const NoSearchResults: React.FC<NoDataStateProps> = ({
  iconName,
  iconSize = 112,
  title,
  description,
  primaryButtonLabel,
  secondaryButtonLabel
}) => {
  return (
    <div className="w-full h-full flex flex-col place-content-center place-items-center border rounded-md py-20 pb-24">
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
