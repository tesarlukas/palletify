import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, VStack } from 'native-base'
import { StackParamsList } from '../components/navigation/types'
import { collection, addDoc } from 'firebase/firestore'
import { FIRESTORE_DB } from '../../firebaseConfig'

export type HomeProps = NativeStackScreenProps<StackParamsList, 'Home'>

const HomeView = () => {
  const handleAddDoc = async () => {
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, 'users'), {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return (
    <VStack flex={1} bg='#fff' alignItems='center' justifyContent='flex-start'>
      <Button onPress={handleAddDoc}>Press</Button>
    </VStack>
  )
}

export default HomeView
