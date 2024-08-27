// RepoLayout.tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Tabs,
  TabsList,
  TabsTrigger,
  Topbar
} from '@harnessio/canary'
import React from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'

const RepoLayout: React.FC = () => {
  const { repoId } = useParams<{ repoId: string }>()

  return (
    <div className="grid grid-rows-[auto_auto_1fr] grid-cols-1">
      <div className="grid sticky top-0 bg-background z-10">
        <Topbar.Root>
          <Topbar.Left>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink className="font-medium text-primary" href="/">
                    {repoId}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="font-thin">&nbsp;/&nbsp;</BreadcrumbSeparator>
                <BreadcrumbPage>
                  <BreadcrumbLink href="/components">pipeline.yml</BreadcrumbLink>
                </BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </Topbar.Left>
          <Topbar.Right>
            <></>
          </Topbar.Right>
        </Topbar.Root>
      </div>
      <div className="grid sticky top-[56px] bg-background z-10">
        <Tabs variant="navigation" defaultValue="index">
          <TabsList>
            <NavLink to={`/repos/${repoId}`}>
              <TabsTrigger value="index">Index</TabsTrigger>
            </NavLink>
            <NavLink to={`commits`}>
              <TabsTrigger value="commits">2-Panel Child Layout</TabsTrigger>
            </NavLink>
            <NavLink to={`pipelines`}>
              <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
            </NavLink>
            {/* <NavLink to={`commits`}>
              <TabsTrigger value="commits">Commits</TabsTrigger>
            </NavLink> */}
            <NavLink to={`pull-requests`}>
              <TabsTrigger value="pull-requests">Pull Requests</TabsTrigger>
            </NavLink>
            <NavLink to={`branches`}>
              <TabsTrigger value="branches">Branches</TabsTrigger>
            </NavLink>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default RepoLayout
