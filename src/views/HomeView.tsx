import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Text, VStack } from 'native-base'
import { StackParamsList } from '../components/navigation/types'
import { useAtom } from 'jotai'
import { userAtom } from '../components/shared/atoms/userAtom'
import { Banner } from '../components/auth'

export type HomeProps = NativeStackScreenProps<StackParamsList, 'Home'>

const HomeView = () => {
  const [user, setUser] = useAtom(userAtom)

  return (
    <VStack flex={1} alignItems='center' justifyContent='flex-start'>
      <Banner />
      <Text fontSize={24}>
        Welcome to Image Gallery,{' '}
        <Text color={'primary.500'}>{user.username}</Text>. 
      </Text>
    </VStack>
  )
}

export default HomeView
