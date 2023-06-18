import React, { useState } from 'react'
import { Button, Image, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { FIREBASE_APP } from '../../firebaseConfig'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

export default function ImagePickerView() {
  const [image, setImage] = useState<string>('')
  const [result, setResult] = useState<any>()
  let uploadUrl: any
  const storage = getStorage(FIREBASE_APP)
  const storageRef = ref(storage)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    setResult(res)

    console.log(`Result state ${result}`)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
    console.log(`Image state: ${image}`)
  }

  const handleImageUpload = async () => {
    console.log(result)
    try {
      if (!result.canceled) {
        uploadUrl = await uploadImageAsync(image)
      }
    } catch (e) {
      console.log(`upload error:${e}`)
    }
  }
  async function uploadImageAsync(uri: string) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
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

    // We're done with the blob, close and release it
    blob.close()

    // return await getDownloadURL(fileRef)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Pick an image from camera roll' onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title='Upload image' onPress={handleImageUpload} />
    </View>
  )
}
