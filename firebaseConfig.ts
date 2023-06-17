// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA4CU_YHcS5eNncNdWc_jNArFWQjlynF-k',
  authDomain: 'palletify-5ca0d.firebaseapp.com',
  projectId: 'palletify-5ca0d',
  storageBucket: 'palletify-5ca0d.appspot.com',
  messagingSenderId: '1026639234862',
  appId: '1:1026639234862:web:6ee12ac8638e04a1f59cbf',
  measurementId: 'G-Y5DYFQQWWM',
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
