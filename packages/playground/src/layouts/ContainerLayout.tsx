import React from 'react'

interface ContainerLayout {}

// This is for container to set up position for the children components
const ContainerLayout: React.FC<ContainerLayout> = () => {
  return <div className="container mx-auto"></div>
}

export default ContainerLayout
