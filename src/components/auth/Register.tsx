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
import { FC, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { addDoc, collection } from 'firebase/firestore'
import { FIRESTORE_DB } from '../../../firebaseConfig'

export const Register: FC<{
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setIsRegistered }) => {
  const { registerUser } = useRegister()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [showPass, setShowPass] = useState<boolean>(false)

  const addUserDetails = async (userId: string) => {
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, 'users'), {
        email: email,
        username: username,
        userId: userId,
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const handleRegister = async () => {
    const registeredUser = await registerUser(email, password)
    if (registeredUser) addUserDetails(registeredUser.uid)
    setIsRegistered(true)
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
              <Button onPress={handleRegister}>Register</Button>
            </Stack>
          </Center>
        </Stack>
      </Center>
    </FormControl>
  )
}
