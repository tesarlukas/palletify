import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useAtom } from 'jotai'
import { userAtom } from '../../shared/atoms/userAtom'
import { useState } from 'react'

export const useLogin = () => {
  const [user, setUser] = useAtom(userAtom)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPass, setShowPass] = useState<boolean>(false)

  const loginUser = async (email: string, password: string) => {
    try {
      const userCredetinals = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      )
      const user = userCredetinals.user
      return user
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUserData = async (userId: string) => {
    const users = await getDocs(collection(FIRESTORE_DB, 'users'))
    let fetchedUser

    users.forEach((user) => {
      if (user.get('userId') == userId) {
        fetchedUser = user.data()
      }
    })

    return fetchedUser
  }

  const handleLogin = async () => {
    const resUser = await loginUser(email, password)
    if (resUser?.uid) {
      const fetchedUser = await fetchUserData(resUser.uid)

      if (fetchedUser) {
        setUser(fetchedUser)
      }
    }
  }

  return {
    handleLogin,
    email,
    password,
    showPass,
    setEmail,
    setPassword,
    setShowPass,
  }
}
