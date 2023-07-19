import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Box, Button, HStack, Icon, Image, Text, useTheme } from 'native-base'
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
    isUploading
  } = useImagePicker()

  const theme = useTheme()
  const loaderColor = theme.colors.primary[400]

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Box style={{ width: '100%', height: 400 }} backgroundColor='gray.200'>
        {image ? (
          <Image
            source={{ uri: image }}
            width='100%'
            height='100%'
            alt='Failed to load an image'
            blurRadius={isUploading ? 5 : 0}

          />
        ) : (
          <Text m='auto'>Pick an image or take a photo</Text>
        )}
        {isUploading && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            color={loaderColor}
            size='large'
          />
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
