import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Rellena estos valores con los de tu proyecto Firebase (te explico cómo más adelante)
const firebaseConfig = {
  apiKey: "AIzaSyD44rUYzFaTmM70zdZLNh0mQWtg3D7Jy9s",
  authDomain: "despensa-app-9cadd.firebaseapp.com",
  projectId: "despensa-app-9cadd",
  storageBucket: "despensa-app-9cadd.firebasestorage.app",
  messagingSenderId: "673583532301",
  appId: "1:673583532301:web:c3169f8d8a3ba9eacec844"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
