import { Center, HStack, StatusBar, Text, View } from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Login, Register } from '../components/auth'
import { Banner } from '../components/auth'

export const AuthView = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false)

  return (
    <View flex={1}>
      <StatusBar backgroundColor={'#222'} />
      <Banner />
      <Center>
        {isRegistered ? (
          <>
            <Login />
            <HStack>
              <Text>Not yet registered? </Text>
              <TouchableOpacity onPress={() => setIsRegistered(false)}>
                <Text color='primary.500'>Sign up!</Text>
              </TouchableOpacity>
            </HStack>
          </>
        ) : (
          <>
            <Register setIsRegistered={setIsRegistered} />
            <HStack>
              <Text>Already registered? </Text>
              <TouchableOpacity onPress={() => setIsRegistered(true)}>
                <Text color='primary.500'>Sign in!</Text>
              </TouchableOpacity>
            </HStack>
          </>
        )}
      </Center>
    </View>
  )
}
