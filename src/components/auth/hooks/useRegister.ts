import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../../../firebaseConfig'

export const useRegister = () => {
  const registerUser = async (
    email: string,
    password: string,
  ) => {
      const userCredetinals = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      )
      const user = userCredetinals.user
      return user
    }
  return { registerUser }
}
