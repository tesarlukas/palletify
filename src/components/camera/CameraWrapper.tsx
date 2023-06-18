import { Camera } from 'expo-camera'
import { Button, Text, View } from 'native-base'
import { Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { useCameraWrapper } from './hooks'

export const CameraWrapper = () => {
  const {
    permission,
    requestPermission,
    type,
    toggleCameraType,
    isModalVisible,
    setIsModalVisible,
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

  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}
      >
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})
