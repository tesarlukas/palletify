import { User } from '../types'
import { atomWithAsyncStorage } from './helperFunctions/atomWithAsync'

export const userAtom = atomWithAsyncStorage<User>('loggedUser', {})

