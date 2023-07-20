import { useRef, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { ImagePickerResult } from 'expo-image-picker'
import { FIREBASE_APP, FIRESTORE_DB } from '../../../../firebaseConfig'
import { useNavigation } from '@react-navigation/native'
import { NavigationHookType } from '../../navigation'
import { useToast } from 'native-base'
import uuid from 'react-native-uuid'
import { imageTimestampsAtom, userAtom } from '../../shared/atoms'
import { useAtom } from 'jotai'
import { addDoc, collection, DocumentData, getDocs } from 'firebase/firestore'
import { Timestamp } from '../../shared/types'

export const useImagePicker = () => {
  const [user, setUser] = useAtom(userAtom)
  const [imageTimestamps, setImageTimestamps] = useAtom(imageTimestampsAtom)
  const [image, setImage] = useState<string>('')
  const [isCameraVisible, setIsCameraVisible] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const result = useRef<ImagePickerResult | undefined>()
  const storage = getStorage(FIREBASE_APP)
  const storageRef = ref(storage, `images/${user.userId}`)

  const toast = useToast()
  const navigation = useNavigation<NavigationHookType>()

  const fetchAndUpdateTimestamps = async () => {
    const res = await getDocs(collection(FIRESTORE_DB, 'timestamps'))
    const fetchedTimestamps: DocumentData | Timestamp[] = []

    res.forEach((timestamp) => {
      fetchedTimestamps.push(timestamp.data())
    })

    setImageTimestamps(fetchedTimestamps as Timestamp[])
  }

  const addImageTimestamp = async (imageId: string, timestamp: number) => {
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, 'timestamps'), {
        imageId: imageId,
        timestamp: timestamp,
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const handleAfterUpload = () => {
    setIsUploading(false)
    toast.show({
      description: 'Image successfully uploaded',
      bgColor: 'success.600',
      duration: 2000,
      placement: 'top',
    })
    setTimeout(() => {
      navigation.navigate('Palettes')
    }, 1000)
  }

  const pickImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      })

      if (!res.canceled) {
        result.current = res
        setImage(res.assets[0].uri)
      }
    } catch (e) {
      console.error(`Error: ${e}`)
    }
  }

  const uploadImageAsync = async (uri: string) => {
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        console.log(e)
        reject(new TypeError('Network request failed'))
      }
      xhr.responseType = 'blob'
      xhr.open('GET', uri, true)
      xhr.send(null)
    })

    const id = uuid.v4().toString()

    const fileRef = ref(storageRef, id)
    const result = await uploadBytes(fileRef, blob)

    await addImageTimestamp(id, Date.now())
    await fetchAndUpdateTimestamps()

    blob.close()
  }

  const handleImageUpload = async () => {
    // console.log(`${result}`)
    setIsUploading(true)

    try {
      if (!result.current?.canceled) {
        await uploadImageAsync(image)
        handleAfterUpload()
      }
    } catch (e) {
      console.log(`upload error:${e}`)
    }
  }

  return {
    isCameraVisible,
    setIsCameraVisible,
    image,
    setImage,
    handleImageUpload,
    pickImage,
    isUploading,
  }
}
