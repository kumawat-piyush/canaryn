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
  Icon
} from '@harnessio/canary'

function TopBarWidget() {
  return (
    <Topbar.Root>
      <Topbar.Left>
        <Breadcrumb className="select-none">
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
  )
}

export default TopBarWidget
