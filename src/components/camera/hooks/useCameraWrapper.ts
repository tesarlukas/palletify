import { Camera, CameraType } from 'expo-camera'
import { useRef, useState } from 'react'

export const useCameraWrapper = () => {
  const [type, setType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const cameraRef = useRef<Camera | null>(null)

  const toggleCameraType = () => {
    setType((current: CameraType) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  const takePicture = async (): Promise<string | undefined> => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync()

        return uri
      } catch (e) {
        console.error(e)
      }
    }
  }

  return {
    toggleCameraType,
    type,
    permission,
    requestPermission,
    cameraRef,
    takePicture,
  }
}
