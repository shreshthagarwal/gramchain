import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDLCYOOWmfgvAyL75wBB9fTZDuKSQruQVg",
    authDomain: "gramchain-a490d.firebaseapp.com",
    projectId: "gramchain-a490d",
    storageBucket: "gramchain-a490d.firebasestorage.app",
    messagingSenderId: "414433921482",
    appId: "1:414433921482:web:a440a638302c64d2e86733",
    measurementId: "G-0S8QVD2RX4"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);