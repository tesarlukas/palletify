import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Text, VStack } from 'native-base'
import { StackParamsList } from '../components/navigation/types'
import { useAtom } from 'jotai'
import { userAtom } from '../components/shared/atoms/userAtom'

export type HomeProps = NativeStackScreenProps<StackParamsList, 'Home'>

const HomeView = () => {
  const [user, setUser] = useAtom(userAtom)

  return (
    <VStack flex={1} bg='#fff' alignItems='center' justifyContent='flex-start'>
      <Text>{user.username}</Text>
    </VStack>
  )
}

export default HomeView
