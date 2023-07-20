import { useNavigation } from '@react-navigation/native'
import { Box, Button, Flex, Icon, Image, ScrollView, View } from 'native-base'
import React, { FC, useEffect, useState } from 'react'
import { NavigationHookType } from '../components/navigation/types'
import { AntDesign } from '@expo/vector-icons'
import { FIREBASE_APP, FIRESTORE_DB } from '../../firebaseConfig'
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { Modal, TouchableOpacity } from 'react-native'
import { Image as ImageExpo } from 'expo-image'
import { useAtom } from 'jotai'
import { imageTimestampsAtom, userAtom } from '../components/shared/atoms'
import { addDoc, collection, DocumentData, getDocs } from 'firebase/firestore'

interface Image {
  name: string
  path: string
}

interface Timestamp {
  imageId: string
  timestamp: number
  path: string
}

export const PalettesView: FC = () => {
  const [imageTimestamps, setImageTimestamps] = useAtom(imageTimestampsAtom)
  const [user, setUser] = useAtom(userAtom)
  const [images, setImages] = useState<Image[]>([])
  const [selectedImage, setSelectedImage] = useState<
    Image | Record<string, never>
  >({})

  const navigation = useNavigation<NavigationHookType>()
  const storage = getStorage(FIREBASE_APP)

  const userImgPath = `images/${user.userId}`
  const listRef = ref(storage, userImgPath)

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
      const imageNameUrls: Image[] = await Promise.all(
        imageNames.map(async (name) => {
          const url = await getDownloadURL(
            ref(storage, `${userImgPath}/${name}`)
          )
          return { name: name, path: url }
        })
      )

      setImages(imageNameUrls)
    } catch (error) {
      console.error(error)
    }
  }

  const viewImage = (image: Image) => {
    setSelectedImage(image)
  }

  const deleteImage = async () => {
    const imageRef = ref(storage, `images/${user.userId}/${selectedImage.name}`)

    try {
      await deleteObject(imageRef)
      setSelectedImage({})
      fetchFiles()
    } catch (error) {
      console.error(error)
    }
  }

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
    fetchFiles()
  }, [imageTimestamps])

  return (
    <>
      <View flex={1}>
        <ScrollView position='relative'>
          <Flex direction='row' wrap='wrap'>
            {images.map((image, i) => (
              <TouchableOpacity key={i} onPress={() => viewImage(image)}>
                <Image size='xl' src={image.path} alt='image is missing' />
              </TouchableOpacity>
            ))}
          </Flex>
        </ScrollView>
        <Button
          onPress={() => navigation.navigate('ImagePicker')}
          backgroundColor='primary.600'
          position='absolute'
          right={5}
          bottom={5}
          rounded='full'
          style={{ zIndex: 1 }}
        >
          <Icon as={AntDesign} name='plus' color='white' size={12} />
        </Button>
        <Modal
          animationType='fade'
          transparent={true}
          visible={Object.keys(selectedImage).length !== 0}
          onRequestClose={() => setSelectedImage({})}
        >
          <View flex={1}>
            <Button
              colorScheme='danger'
              position='absolute'
              right={5}
              top={5}
              zIndex={1}
              rounded='full'
              p={4}
              onPress={() => deleteImage()}
            >
              <Icon as={AntDesign} name='delete' color='white' size={10} />
            </Button>
            <ImageExpo
              source={selectedImage.path}
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: '#000A',
              }}
              contentFit='contain'
            />
          </View>
        </Modal>
      </View>
    </>
  )
}
