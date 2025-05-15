"use client"

import { auth } from './firebase'
import { 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    let errorMessage = 'Error al iniciar sesión'
    if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Credenciales inválidas'
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Demasiados intentos fallidos. Intenta más tarde'
    }
    throw new Error(errorMessage)
  }
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
    throw error
  }
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
} 