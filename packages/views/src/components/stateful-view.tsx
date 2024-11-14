import { Button } from '@harnessio/canary'

export interface IDataStore {
  count: number
  setCount: (count: number) => void
  incrementCount: () => void
}

interface SampleComponentProps {
  useDataStore: () => IDataStore
}

export function SampleComponent({ useDataStore }: SampleComponentProps) {
  const { count, incrementCount } = useDataStore()

  return (
    <>
      <div>Current count: {count}</div>
      <Button
        onClick={() => {
          incrementCount()
        }}>
        Click me!
      </Button>
    </>
  )
}
