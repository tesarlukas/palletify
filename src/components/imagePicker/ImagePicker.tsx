import React from 'react'
import { View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Box, Button, HStack, Icon, Image, Text } from 'native-base'
import { useImagePicker } from './hooks'
import { CameraWrapper } from '../camera/CameraWrapper'
import { Entypo } from '@expo/vector-icons'

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
      <Box style={{ width: '100%', height: 400 }} backgroundColor='gray.200'>
        {image ? (
          <Image
            source={{ uri: image }}
            width='100%'
            height='100%'
            alt='Failed to load an image'
          />
        ) : (
          <Text m='auto'>Pick an image or take a photo</Text>
        )}
      </Box>
      <HStack mt={4}>
        <Button onPress={pickImage} rounded='2xl' mx={2}>
          <Icon as={Entypo} name='folder-images' color='white' size={12} />
        </Button>
        <Button onPress={() => setIsCameraVisible(true)} rounded='2xl' mx={2}>
          <Icon as={AntDesign} name='camera' color='white' size={12} />
        </Button>
        {image && (
          <Button onPress={handleImageUpload} rounded='2xl' mx={2}>
            <Icon as={AntDesign} name='upload' color='white' size={12} />
          </Button>
        )}
      </HStack>
      <CameraWrapper
        setImage={setImage}
        isCameraVisible={isCameraVisible}
        setIsCameraVisible={setIsCameraVisible}
      />
    </View>
  )
}
