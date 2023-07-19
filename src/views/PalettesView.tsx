import { useNavigation } from '@react-navigation/native'
import { Box, Button, Flex, Icon, Image, ScrollView, View } from 'native-base'
import { FC, useEffect, useState } from 'react'
import { NavigationHookType } from '../components/navigation/types'
import { AntDesign } from '@expo/vector-icons'
import { FIREBASE_APP } from '../../firebaseConfig'
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'
import { Modal } from 'react-native'
import { Image as ImageExpo } from 'expo-image'

export const PalettesView: FC = () => {
  const navigation = useNavigation<NavigationHookType>()
  const storage = getStorage(FIREBASE_APP)
  const listRef = ref(storage)
  const [images, setImages] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState('')

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
            return await getDownloadURL(ref(storage, name))
          })
        )

        setImages(imageUrls)
      } catch (error) {
        console.error(error)
      }
    }

    fetchFiles()
  }, [])

  const viewImage = (path: string) => {
    setSelectedImage(path)
  }

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
