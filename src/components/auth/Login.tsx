import { useLogin } from './hooks'
import {
  Input,
  Stack,
  FormControl,
  Button,
  Center,
  Pressable,
  Icon,
} from 'native-base'
import { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { atom, useAtom } from 'jotai'
import { User } from '../shared/types'
import { userAtom } from '../../App'

export const Login = () => {
  const { loginUser, fetchUserData } = useLogin()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPass, setShowPass] = useState<boolean>(false)
  const [user, setUser] = useAtom(userAtom)

  const handleLogin = async () => {
    const resUser = await loginUser(email, password)
    if (resUser?.uid) {
      const fetchedUser = await fetchUserData(resUser.uid)

      if (fetchedUser) {
        setUser(fetchedUser)
      }
    }
  }

  return (
    <FormControl>
      <Center>
        <Stack space={5} p={2} width='90%'>
          <Stack>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              type='text'
              variant='outline'
              value={email}
              onChangeText={(text) => setEmail(text)}
              p={2}
              placeholder='Email'
            />
          </Stack>
          <Stack>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              variant='outline'
              value={password}
              onChangeText={(text) => setPassword(text)}
              p={2}
              type={showPass ? 'text' : 'password'}
              InputRightElement={
                <Pressable onPress={() => setShowPass(!showPass)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={showPass ? 'visibility' : 'visibility-off'}
                      />
                    }
                    size={5}
                    mr='2'
                    color='muted.400'
                  />
                </Pressable>
              }
              placeholder='Password'
            />
          </Stack>
          <Center>
            <Stack width='75%'>
              <Button onPress={handleLogin}>Login</Button>
            </Stack>
          </Center>
        </Stack>
      </Center>
    </FormControl>
  )
}
