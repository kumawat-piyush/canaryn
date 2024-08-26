import React from 'react'

interface FixedHeightLayoutProps {
  children: React.ReactNode
}
//only pipline edit and yaml edit is using this layout for fixed height,
//if one of the children is not a fixed height, it will break the layout, so all children can't be auto
const FixedHeightLayout = ({ children }: FixedHeightLayoutProps) => {
  return <div className={'grid grid-auto-flow h-[calc(100vh-100px)]'}>{children}</div>
}

export default FixedHeightLayout
