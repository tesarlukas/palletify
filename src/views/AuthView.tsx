import { Center, Text, View } from 'native-base'
import { useState } from 'react'
import { Login, Register } from '../components/auth'

export const AuthView = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false)

  return (
    <View flex={1}>
      <Center>
        {isRegistered ? (
          <>
            <Login />
            <Text>
              Not yet registered?{' '}
              <Text color='primary.500' onPress={() => setIsRegistered(false)}>
                Sign up!
              </Text>
            </Text>
          </>
        ) : (
          <>
            <Register />
            <Text>
              Already registered?{' '}
              <Text color='primary.500' onPress={() => setIsRegistered(true)}>
                Sign in!
              </Text>
            </Text>
          </>
        )}
      </Center>
    </View>
  )
}
