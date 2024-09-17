import React from 'react'
import { noop } from 'lodash-es'
import { Spacer, Tabs, TabsList, TabsTrigger } from '@harnessio/canary'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { TopBarWidget } from '../components/layout/top-bar-widget'
import { mockProjects } from '../data/mockProjects'

const RepoLayout: React.FC = () => {
  const { executionId } = useParams<{ executionId: string }>()

  return (
    <div className="min-h-full">
      <div className="sticky top-0 bg-background z-50">
        <TopBarWidget projects={mockProjects} onSelectProject={noop} />
        {!executionId && (
          <Tabs variant="navigation" defaultValue="summary">
            <TabsList>
              <NavLink to={`summary`}>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </NavLink>
              <NavLink to={`code`}>
                {/* Why called Files in nav but Code in figma? */}
                <TabsTrigger value="code">Files</TabsTrigger>
              </NavLink>
              <NavLink to={`pipelines`}>
                <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
              </NavLink>
              <NavLink to={`commits`}>
                <TabsTrigger value="commits">Commits</TabsTrigger>
              </NavLink>
              <NavLink to={`pull-requests`}>
                <TabsTrigger value="pull-requests">Pull Requests</TabsTrigger>
              </NavLink>
              <NavLink to={`branches`}>
                <TabsTrigger value="branches">Branches</TabsTrigger>
              </NavLink>
            </TabsList>
          </Tabs>
        )}
      </div>
      <main className="min-h-full">
        <Outlet />
      </main>
      {/* TODO: avoid duplicating spacer */}
      <Spacer size={12} />
      <Spacer size={12} />
    </div>
  )
}

export default RepoLayout
