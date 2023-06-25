import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../../../firebaseConfig'

export const useLogin = () => {
  const loginUser = async (
    email: string,
    password: string,
  ) => {
    try {
      const userCredetinals = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      )
      const user = userCredetinals.user
      console.log(user)
    } catch (error) {
      console.error(error)
    }
  }
  return { loginUser }
}
