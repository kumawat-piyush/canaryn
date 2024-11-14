import { SampleComponent } from '@harnessio/views'
import { useDataStore } from './stateful-store'
import { useMembershipSpacesQuery } from '@harnessio/code-service-client'

export function StatefulPage() {
  const { setCount } = useDataStore()

  // we can set data from API response
  // and zustand manages updates + rerendering
  useMembershipSpacesQuery(
    { queryParams: {} },
    {
      onSuccess: ({ body: spaces }) => {
        if (spaces?.length) setCount(spaces.length)
      }
    }
  )

  return <SampleComponent useDataStore={useDataStore} />

  /* Alternative API which hides store contract, but makes the props MUCH more verbose
  const { count, setCount, incrementCount } = useDataStore()
  
  return <SampleComponent count={count} setCount={setCount} incrementCount={incrementCount} />
  */
}
