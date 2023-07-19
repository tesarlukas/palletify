import { Camera } from 'expo-camera'
import { Button, HStack, Icon, Text, View } from 'native-base'
import { FC } from 'react'
import { Modal, StyleSheet } from 'react-native'
import { useCameraWrapper } from './hooks'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface CameraWrapper {
  setImage: React.Dispatch<React.SetStateAction<string>>
  isCameraVisible: boolean
  setIsCameraVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const CameraWrapper: FC<CameraWrapper> = ({
  setImage,
  isCameraVisible,
  setIsCameraVisible,
}) => {
  const {
    permission,
    requestPermission,
    type,
    toggleCameraType,
    cameraRef,
    takePicture,
  } = useCameraWrapper()

  if (!permission) {
    // Camera permissions are still loading
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>Grant permission</Button>
      </View>
    )
  }

  const handleTakePicture = async () => {
    const picture = await takePicture()
    if (picture) setImage(picture)
    setIsCameraVisible(false)
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isCameraVisible}
        onRequestClose={() => setIsCameraVisible(!isCameraVisible)}
      >
        <Camera ratio='16:9' style={styles.camera} type={type} ref={cameraRef}>
          <HStack
            position='absolute'
            flex={1}
            bottom={12}
            width='100%'
            justifyContent='center'
          >
            <Button
              alignSelf='flex-end'
              backgroundColor='gray.300'
              rounded='full'
              onPress={toggleCameraType}
              mx={2}
            >
              <Icon as={MaterialCommunityIcons} name='camera-flip' size={12} />
            </Button>
            <Button
              alignSelf='flex-end'
              backgroundColor='gray.300'
              _pressed={{ backgroundColor: 'gray.100' }}
              rounded='full'
              onPress={handleTakePicture}
              mx={2}
            >
              <Icon as={MaterialCommunityIcons} name='camera-iris' size={12} />
            </Button>
          </HStack>
        </Camera>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
})
