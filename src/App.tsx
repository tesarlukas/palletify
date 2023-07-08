import { atom } from 'jotai'
import { Navigation } from './components/navigation/Navigation'
import { User } from './components/shared/types'

export const userAtom = atom<User>({})

export default function App() {
  return <Navigation />
}
