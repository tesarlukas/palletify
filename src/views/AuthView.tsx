import { Center, Text, View } from 'native-base'
import { Login, Register } from '../components/auth'

export const AuthView = () => {
  return (
    <View flex={1}>
      <Register />
      <Login />
    </View>
  )
}
