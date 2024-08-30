// RepoLayout.tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
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
    <div>
      {/* Replace this with TopBarWidget, make dynamic */}
      <Topbar.Root>
        <Topbar.Left>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                    <BreadcrumbLink className="font-medium text-primary">Pixel Point</BreadcrumbLink>

                    <Icon name="chevron-down" size={10} className="text-primary" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="mt-2">
                    <DropdownMenuItem>Pixel Point</DropdownMenuItem>
                    <DropdownMenuItem>United Bank</DropdownMenuItem>
                    <DropdownMenuItem>Code Wizards</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="font-thin">&nbsp;/&nbsp;</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="font-normal text-primary" href="/repos">
                  {repoId}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {/* Make this dynamic */}
              {/* <BreadcrumbSeparator className="font-thin">&nbsp;/&nbsp;</BreadcrumbSeparator>
              <BreadcrumbPage>
                <BreadcrumbLink href="/components">pipeline.yml</BreadcrumbLink>
              </BreadcrumbPage> */}
            </BreadcrumbList>
          </Breadcrumb>
        </Topbar.Left>
        <Topbar.Right>
          <></>
        </Topbar.Right>
      </Topbar.Root>
      <Tabs variant="navigation" defaultValue="pipelines">
        <TabsList>
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
      <main className="min-h-[calc(100vh-100px)] box-border overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}

export default RepoLayout
