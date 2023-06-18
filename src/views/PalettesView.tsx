import { useNavigation } from '@react-navigation/native'
import { Button, Icon, ScrollView, View } from 'native-base'
import { FC } from 'react'
import { NavigationHookType } from '../components/navigation/types'
import { AntDesign } from '@expo/vector-icons'
import { FIREBASE_APP } from '../../firebaseConfig'
import { getStorage, ref } from 'firebase/storage'
import { CameraWrapper } from '../components/camera/CameraWrapper'

export const PalettesView: FC = () => {
  const navigation = useNavigation<NavigationHookType>()
  const storage = getStorage(FIREBASE_APP)
  const storageRef = ref(storage);
  const imageRef = ref(storage, 'images/imagetest1');
  console.log(imageRef.fullPath)

  return (
    <>
      <View flex={1}>
        <ScrollView></ScrollView>
        <Button
          right={5}
          bottom={5}
          rounded='full'
          position='absolute'
          onPress={() => navigation.navigate('Camera')}
        >
          <Icon as={AntDesign} name='plus' color='white' size={12} />
        </Button>
      </View>
    </>
  )
}
