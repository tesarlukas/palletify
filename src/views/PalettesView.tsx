import { useNavigation } from '@react-navigation/native'
import { Box, Button, Flex, Icon, Image, ScrollView, View } from 'native-base'
import { FC, useEffect, useState } from 'react'
import { NavigationHookType } from '../components/navigation/types'
import { AntDesign } from '@expo/vector-icons'
import { FIREBASE_APP, FIRESTORE_DB } from '../../firebaseConfig'
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'
import { Modal } from 'react-native'
import { Image as ImageExpo } from 'expo-image'
import { useAtom } from 'jotai'
import { imageTimestampsAtom, userAtom } from '../components/shared/atoms'
import { addDoc, collection, DocumentData, getDocs } from 'firebase/firestore'

export const PalettesView: FC = () => {
  const [imageTimestamps, setImageTimestamps] = useAtom(imageTimestampsAtom)
  const [user, setUser] = useAtom(userAtom)
  const [images, setImages] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState('')

  const navigation = useNavigation<NavigationHookType>()
  const storage = getStorage(FIREBASE_APP)

  const userImgPath = `images/${user.userId}`
  const listRef = ref(storage, userImgPath)

  const viewImage = (path: string) => {
    setSelectedImage(path)
  }

  // TODO sorting
  // interface Timestamp {
  //   imageId: string
  //   timestamp: number
  // }

  // const fetchTimestamps = async () => {
  //   const res = await getDocs(collection(FIRESTORE_DB, 'timestamps'))
  //   const fetchedTimestamps: DocumentData | Timestamp[] = []
  //
  //   res.forEach((timestamp) => {
  //     fetchedTimestamps.push(timestamp.data())
  //   })
  //
  //   return fetchedTimestamps
  // }

  
  useEffect(() => {
    const fetchNames = async (): Promise<string[]> => {
      const imageNames: string[] = []

      try {
        const res = await listAll(listRef)
        res.items.forEach((itemRef) => {
          imageNames.push(itemRef.name)
        })
      } catch (error) {
        console.error(error)
      }

      return imageNames
    }

    const fetchFiles = async () => {
      try {
        const imageNames: string[] = await fetchNames()
        const imageUrls: string[] = await Promise.all(
          imageNames.map(async (name) => {
            return await getDownloadURL(ref(storage, `${userImgPath}/${name}`))
          })
        )

        setImages(imageUrls)
      } catch (error) {
        console.error(error)
      }
    }

    fetchFiles()
  }, [imageTimestamps])

  return (
    <>
      <View flex={1}>
        <ScrollView position='relative'>
          <Flex direction='row' wrap='wrap'>
            {images.map((path, i) => (
              <Box key={i} onTouchEnd={() => viewImage(path)}>
                <Image size='xl' src={path} alt='image is missing' />
              </Box>
            ))}
          </Flex>
        </ScrollView>
        <Button
          right={5}
          bottom={5}
          backgroundColor='primary.600'
          rounded='full'
          position='absolute'
          onPress={() => navigation.navigate('ImagePicker')}
        >
          <Icon as={AntDesign} name='plus' color='white' size={12} />
        </Button>
        <Modal
          animationType='fade'
          transparent={true}
          visible={selectedImage !== ''}
          onRequestClose={() => setSelectedImage('')}
        >
          <ImageExpo
            source={selectedImage}
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#000A',
            }}
            contentFit='contain'
          />
        </Modal>
      </View>
    </>
  )
}
