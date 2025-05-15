"use client"

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCD2pqwCKUfS6NkQfmYefbtzLAC2g-rGHY",
  authDomain: "lab-65f6e.firebaseapp.com",
  projectId: "lab-65f6e",
  storageBucket: "lab-65f6e.firebasestorage.app",
  messagingSenderId: "339315140483",
  appId: "1:339315140483:web:2ed4e89dce73a35077f8b6",
  measurementId: "G-968SYNGJCZ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics conditionally (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

// Función para guardar resultados del cuestionario
export const saveQuestionnaireResult = async (result: any) => {
  try {
    const docRef = await addDoc(collection(db, "questionnaire-results"), {
      ...result,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving questionnaire result:", error);
    throw error;
  }
};

export { app, auth, db, storage, analytics }; 