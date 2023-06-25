import { NavigationProp } from '@react-navigation/native'

export type StackParamsList = {
  Home: undefined
  Palettes: undefined
  Settings: undefined
  ImagePicker: undefined
}

export interface NavButton {
  icon: React.ReactNode
  onClick: () => void
}

export type NavigationHookType = NavigationProp<StackParamsList>
