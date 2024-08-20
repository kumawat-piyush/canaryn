import React from 'react'

interface ContainterLayout {
  children: React.ReactNode
}

// This is for header
const ContainterLayout: React.FC<ContainterLayout> = ({ children }) => {
  return <div className="">{children}</div>
}

export default ContainterLayout
