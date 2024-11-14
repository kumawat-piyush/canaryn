import { SampleComponent } from '@harnessio/views'
import { useDataStore } from './stateful-store'
import { useMembershipSpacesQuery } from '@harnessio/code-service-client'

export function StatefulPage() {
  const { setCount } = useDataStore()

  // set data from API response
  useMembershipSpacesQuery(
    { queryParams: {} },
    {
      onSuccess: ({ body: spaces }) => {
        if (spaces?.length) setCount(spaces.length)
      }
    }
  )

  return <SampleComponent useDataStore={useDataStore} />
}
