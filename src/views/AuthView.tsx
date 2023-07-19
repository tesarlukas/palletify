import { Center, StatusBar, Text, View } from 'native-base'
import { useState } from 'react'
import { Login, Register } from '../components/auth'

export const AuthView = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false)

  return (
    <View flex={1}>
      <StatusBar backgroundColor={'#222'} />
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
            <Register setIsRegistered={setIsRegistered}/>
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
