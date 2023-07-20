import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useAtom } from 'jotai'
import { userAtom } from '../../shared/atoms/userAtom'
import { useEffect, useState } from 'react'
import { useToast } from 'native-base'

export const useLogin = () => {
  const [user, setUser] = useAtom(userAtom)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPass, setShowPass] = useState<boolean>(false)
  const toast = useToast()

  let error = ''
  const [isEmpty, setIsEmpty] = useState(true)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const loginUser = async (email: string, password: string) => {
    const userCredetinals = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    )
    const user = userCredetinals.user
    return user
  }

  const fetchUserData = async (userId: string) => {
    try {
      const users = await getDocs(collection(FIRESTORE_DB, 'users'))
      let fetchedUser

      users.forEach((user) => {
        if (user.get('userId') == userId) {
          fetchedUser = user.data()
        }
      })

      return fetchedUser
    } catch (error) {
      console.error()
    }
  }

  const validateInputs = () => {
    error = ''

    if (!emailRegex.test(email)) {
      error = 'Invalid email address'
      toast.show({
        description: error,
        bgColor: 'danger.600',
        duration: 5000,
        placement: 'top',
      })
    }
  }

  const handleLogin = async () => {
    validateInputs()
    try {
      const resUser = await loginUser(email, password)
      if (resUser?.uid) {
        const fetchedUser = await fetchUserData(resUser.uid)

        if (fetchedUser) {
          setUser(fetchedUser)
        }
      }
    } catch (error) {
      if ((error.code as string).includes('password')) {
        toast.show({
          description: 'Invalid password',
          bgColor: 'danger.600',
          duration: 5000,
          placement: 'top',
        })
      }
      console.error(error)
    }
  }

  const checkEmpty = () => {
    email.length > 0 && password.length > 5
      ? setIsEmpty(false)
      : setIsEmpty(true)
  }

  useEffect(() => {
    checkEmpty()
  }, [email, password])

  return {
    handleLogin,
    email,
    password,
    showPass,
    setEmail,
    setPassword,
    setShowPass,
    isEmpty,
  }
}
