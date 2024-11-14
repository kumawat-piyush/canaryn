import { IDataStore } from '@harnessio/views'
import { create } from 'zustand'

// actual implementation of the store using zustand in `gitness` app
export const useDataStore = create<IDataStore>(set => ({
  count: 0,
  setCount: (newCount: number) => set(() => ({ count: newCount })),
  incrementCount: () => set(state => ({ count: state.count + 1 })) // business logic
}))
