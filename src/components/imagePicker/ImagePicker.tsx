import React from 'react'
import { Image, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Button, Icon } from 'native-base'
import { useImagePicker } from './hooks'
import { CameraWrapper } from '../camera/CameraWrapper'

export const ImagePicker = () => {
  const {
    isCameraVisible,
    setIsCameraVisible,
    image,
    setImage,
    handleImageUpload,
    pickImage,
  } = useImagePicker()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={pickImage}>Pick an image from camera roll</Button>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button onPress={handleImageUpload}>Upload image</Button>
      <CameraWrapper
        setImage={setImage}
        isCameraVisible={isCameraVisible}
        setIsCameraVisible={setIsCameraVisible}
      />
      <Button
        right={5}
        bottom={5}
        rounded='full'
        position='absolute'
        onPress={() => setIsCameraVisible(true)}
      >
        <Icon as={AntDesign} name='plus' color='white' size={12} />
      </Button>
    </View>
  )
}
