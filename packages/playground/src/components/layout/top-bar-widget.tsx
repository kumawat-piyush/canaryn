import React from 'react'
import {
  Topbar,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  DropdownMenu,
  DropdownMenuTrigger,
  BreadcrumbLink,
  DropdownMenuContent,
  DropdownMenuItem,
  Icon,
  Avatar,
  AvatarFallback,
  BreadcrumbSeparator
} from '@harnessio/canary'
import { useParams } from 'react-router-dom'

function TopBarWidget() {
  const { repoId } = useParams<{ repoId: string }>()
  const { executionId } = useParams<{ executionId: string }>()

  return (
    <Topbar.Root>
      <Topbar.Left>
        <Breadcrumb className="select-none">
          <BreadcrumbList>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                  <Avatar className="w-7 h-7">
                    <AvatarFallback>P</AvatarFallback>
                  </Avatar>
                  <BreadcrumbLink className="font-medium text-primary">Pixel Point</BreadcrumbLink>
                  <Icon name="chevron-down" size={10} className="text-primary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="mt-1.5">
                  <DropdownMenuItem>Pixel Point</DropdownMenuItem>
                  <DropdownMenuItem>United Bank</DropdownMenuItem>
                  <DropdownMenuItem>Code Wizards</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            {repoId && (
              <>
                <BreadcrumbSeparator className="font-thin">&nbsp;/&nbsp;</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink className="font-normal text-primary" href="/repos">
                    {repoId}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            {executionId && (
              <>
                <BreadcrumbSeparator className="font-thin">&nbsp;/&nbsp;</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink className="font-normal text-primary" href={`/repos/${repoId}/pipelines`}>
                    Pipelines
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </Topbar.Left>
      <Topbar.Right>
        <></>
      </Topbar.Right>
    </Topbar.Root>
  )
}

export default TopBarWidget
