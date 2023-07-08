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
import { MaterialIcons } from '@expo/vector-icons'

export const Login = () => {
  const {
    handleLogin,
    email,
    password,
    showPass,
    setEmail,
    setPassword,
    setShowPass,
  } = useLogin()

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
