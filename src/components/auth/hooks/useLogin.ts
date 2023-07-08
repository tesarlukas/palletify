import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

export const useLogin = () => {
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
    let fetchedUser;

    users.forEach((user) => {
      if (user.get('userId') == userId) {
        fetchedUser = user.data()
      }
    })

    return fetchedUser
  }

  return { loginUser, fetchUserData }
}
