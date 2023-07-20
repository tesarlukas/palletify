import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NavButton, NavigationHookType } from '../types'

export const useNavigationBar = () => {
  const navigation = useNavigation<NavigationHookType>()

  const navButtons: NavButton[] = [
    {
      icon: <AntDesign name='home' size={24} color='white' />,
      onClick: () => navigation.navigate('Home'),
    },
    {
      icon: <Ionicons name='image-outline' size={24} color='white' />,
      onClick: () => navigation.navigate('Palettes'),
    },
    {
      icon: <AntDesign name='setting' size={24} color='white' />,
      onClick: () => navigation.navigate('Settings'),
    },
  ]

  return {
    navButtons,
  }
}
