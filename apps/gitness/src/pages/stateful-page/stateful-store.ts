import { IDataStore } from '@harnessio/views'
import { create } from 'zustand'

export const useDataStore = create<IDataStore>(set => ({
  count: 0,
  setCount: (newCount: number) => set(() => ({ count: newCount })),
  incrementCount: () => set(state => ({ count: state.count + 1 }))
}))
