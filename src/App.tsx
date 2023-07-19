import { useAtom } from 'jotai'
import { NativeBaseProvider } from 'native-base'
import { Navigation } from './components/navigation/Navigation'
import { userAtom } from './components/shared/atoms/userAtom'
import { AuthView } from './views/AuthView'

export default function App() {
  const [user, setUser] = useAtom(userAtom)

  // if (user.userId) {
    return <Navigation />
  // }

  return (
    <NativeBaseProvider>
      <AuthView />
    </NativeBaseProvider>
  )
}
