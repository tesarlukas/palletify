import { NativeBaseProvider, StatusBar } from 'native-base'
import { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigationBar from './NavigationBar'
import HomeView from '../../views/HomeView'
import Palettes from '../../views/Palettes'
import { SettingsView } from '../../views/SettingsView'
import { StackParamsList } from './types'

const Stack = createNativeStackNavigator<StackParamsList>()

export const Navigation: FC = () => {
  return (
   <NavigationContainer>
      <NativeBaseProvider>
        <StatusBar backgroundColor={'#222'} />
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={HomeView} />
          <Stack.Screen name='Palettes' component={Palettes} />
          <Stack.Screen name='Settings' component={SettingsView} />
        </Stack.Navigator>
        <NavigationBar />
      </NativeBaseProvider>
    </NavigationContainer> 
  )
}
