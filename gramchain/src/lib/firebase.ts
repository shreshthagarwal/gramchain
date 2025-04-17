import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDLCYOOWmfgvAyL75wBB9fTZDuKSQruQVg",
  authDomain: "gramchain-a490d.firebaseapp.com",
  projectId: "gramchain-a490d",
  storageBucket: "gramchain-a490d.firebasestorage.app",
  messagingSenderId: "414433921482",
  appId: "1:414433921482:web:2a6080122fbf9579e86733",
  measurementId: "G-PVL4PF721D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 