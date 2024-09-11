import { Topbar, Text } from '@harnessio/canary'
import { TopBarWidget } from '@harnessio/playground'
import { useMembershipSpacesQuery } from '@harnessio/code-service-client'

export default function HeaderApi() {
  //fetch projects api to get the list of projects
  const { data: projects, isLoading } = useMembershipSpacesQuery({
    queryParams: { page: 1, limit: 30, sort: 'identifier', order: 'asc' }
  })
  //prevent rendering the page until the projects are loaded
  if (isLoading) {
    return (
      <Topbar.Root>
        <Topbar.Left>
          <Text size={2} weight="medium" className="text-primary">
            Loading Your Project...
          </Text>
        </Topbar.Left>
      </Topbar.Root>
    )
  }

  const projectsItem: Project[] =
    // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
    projects?.content?.map(membership => ({
      id: membership?.space?.id,
      name: membership?.space?.identifier
    })) || []

  if (projectsItem.length === 0) {
    //temperrary for edge cases
    //will redirect to the create project page for next steps if the user doesn't have any projects
    //currently the create project page is not implemented
    return (
      <Topbar.Root>
        <Topbar.Left>
          <Text size={2} weight="medium" className="text-primary">
            Please create a new project
          </Text>
        </Topbar.Left>
      </Topbar.Root>
    )
  }

  return (
    <>
      <TopBarWidget projects={projectsItem} />
      {/* migrate route from the repolayout in the playground */}
      {/* {!executionId && (
        <Tabs variant="navigation" defaultValue="summary">
          <TabsList>
            <NavLink to={`summary`}>
              <TabsTrigger value="summary">Summary</TabsTrigger>
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
      )} */}
    </>
  )
}
