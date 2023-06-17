import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { VStack } from 'native-base'
import { StackParamsList } from '../components/navigation/types'

export type HomeProps = NativeStackScreenProps<StackParamsList, 'Home'>

const HomeView = () => {
  return (
    <VStack
      flex={1}
      bg='#fff'
      alignItems='center'
      justifyContent='flex-start'
    ></VStack>
  )
}

export default HomeView
