import { useRegister } from './hooks'
import {
  Input,
  Stack,
  FormControl,
  Button,
  Center,
  Pressable,
  Icon,
  VStack,
  useToast,
  Text,
} from 'native-base'
import { FC, useEffect, useState } from 'react'
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

  let error = ''
  const [isEmpty, setIsEmpty] = useState(true)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^.{6,}$/

  const toast = useToast()

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

  const validateInputs = () => {
    error = ''

    if (!emailRegex.test(email)) {
      error = 'Invalid email address'
    }

    if (!passwordRegex.test(password)) {
      error = 'Password requirements not met'
    }

    if (error.length > 0) {
      toast.show({
        description: error,
        bgColor: 'danger.600',
        duration: 5000,
        placement: 'top',
      })
    }
  }

  const handleRegister = async () => {
    try {
      validateInputs()

      const registeredUser = await registerUser(email, password)
      if (registeredUser) addUserDetails(registeredUser.uid)

      setIsRegistered(true)
      toast.show({
        description: 'User successfully registered',
        bgColor: 'success.600',
        duration: 2000,
        placement: 'top',
      })
    } catch (error) {
      console.error(error)
    }
  }

  const checkEmpty = () => {
    email.length > 0 && password.length > 5 && username.length > 0
      ? setIsEmpty(false)
      : setIsEmpty(true)
  }

  useEffect(() => {
    checkEmpty()
  }, [email, password, username])

  return (
    <FormControl>
      <Center>
        <VStack space={5} p={2} width='90%'>
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
            <FormControl.HelperText>
              Password must be at least 6 characters.
            </FormControl.HelperText>
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
              <Button
                onPress={handleRegister}
                disabled={isEmpty}
                colorScheme={!isEmpty ? 'primary' : 'gray'}
              >
                Register
              </Button>
            </Stack>
          </Center>
        </VStack>
      </Center>
    </FormControl>
  )
}
