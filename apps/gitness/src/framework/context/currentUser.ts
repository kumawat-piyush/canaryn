import { TypesUser } from '@harnessio/code-service-client'
import { atom } from 'jotai'

export const currentUserAtom = atom<TypesUser | undefined>(undefined)
