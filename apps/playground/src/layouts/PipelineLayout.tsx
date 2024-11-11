import React from 'react'
import { Outlet } from 'react-router-dom'
import { noop } from 'lodash-es'
import { TopBarWidget } from '@harnessio/fragments'
import { mockProjects } from '../data/mockProjects'

const PipelineLayout: React.FC = () => {
  return (
    <>
      <TopBarWidget projects={mockProjects} onSelectProject={noop} />
      <Outlet />
    </>
  )
}

export default PipelineLayout
