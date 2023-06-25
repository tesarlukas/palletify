import { useRegister } from './hooks'
import {
  Input,
  Stack,
  FormControl,
  Button,
  Center,
  Pressable,
  Icon,
} from 'native-base'
import { useRef, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

export const Register = () => {
  const { registerUser } = useRegister()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [showPass, setShowPass] = useState<boolean>(false)

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
          <Stack>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              variant='outline'
              value={username}
              onChangeText={(text) => setUsername(text)}
              p={2}
              placeholder='Username'
            />
          </Stack>
          <Center>
            <Stack width='75%'>
              <Button onPress={() => registerUser(email, password, username)}>
                Register
              </Button>
            </Stack>
          </Center>
        </Stack>
      </Center>
    </FormControl>
  )
}
