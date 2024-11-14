import { IDataStore, SampleComponent } from '@harnessio/views'
import { noop } from 'lodash-es'

function useDataStore(): IDataStore {
  return {
    count: 9, // sample mock data
    setCount: noop, // state updates don't need to be handled in playground
    incrementCount: noop
  }
}

export function StatefulPage() {
  return <SampleComponent useDataStore={useDataStore} />
}
