import { Camera, CameraType } from 'expo-camera'
import { useState } from 'react'

export const useCameraWrapper = () => {
  const [type, setType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [isModalVisible, setIsModalVisible] = useState(true)

  const toggleCameraType = () => {
    setType((current: CameraType) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  return {
    toggleCameraType,
    type,
    permission,
    requestPermission,
    isModalVisible,
    setIsModalVisible,
  }
}
