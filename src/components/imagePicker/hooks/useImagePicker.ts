import { useRef, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { ImagePickerResult } from 'expo-image-picker'
import { FIREBASE_APP } from '../../../../firebaseConfig'

export const useImagePicker = () => {
  const [image, setImage] = useState<string>('')
  const [isCameraVisible, setIsCameraVisible] = useState(false)
  const result = useRef<ImagePickerResult | undefined>()
  const storage = getStorage(FIREBASE_APP)
  const storageRef = ref(storage)

  const pickImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
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

    const fileRef = ref(storageRef, (Math.random() * 1000).toString())
    const result = await uploadBytes(fileRef, blob)
    console.log(result)

    blob.close()
  }

  const handleImageUpload = async () => {
    console.log(`${result}`)

    try {
      if (!result.current?.canceled) {
        await uploadImageAsync(image)
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
    pickImage
  }
}
