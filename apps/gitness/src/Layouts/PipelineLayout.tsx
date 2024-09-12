import { TopBarWidget } from '@harnessio/playground'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { mockProjects } from '../mock'

const PipelineLayout: React.FC = () => {
  return (
    <>
      <TopBarWidget projects={mockProjects} />
      <Outlet />
    </>
  )
}

export default PipelineLayout
