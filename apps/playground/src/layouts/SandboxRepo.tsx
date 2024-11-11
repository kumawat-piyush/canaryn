import React from 'react'
import { noop } from 'lodash-es'
import { Outlet } from 'react-router-dom'
import { TopBarWidget, SandboxLayout } from '@harnessio/fragments'
import { mockProjects } from '../data/mockProjects'

const SandboxRepo: React.FC = () => {
  return (
    <>
      <SandboxLayout.Header>
        <TopBarWidget projects={mockProjects} onSelectProject={noop} />
      </SandboxLayout.Header>
      <Outlet />
    </>
  )
}

export { SandboxRepo }
