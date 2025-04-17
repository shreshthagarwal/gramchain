import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Debug logging to check environment variables
console.log('Firebase Config:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
});

const firebaseConfig = {
  apiKey: "AIzaSyDLCYOOWmfgvAyL75wBB9fTZDuKSQruQVg",
  authDomain: "gramchain-a490d.firebaseapp.com",
  projectId: "gramchain-a490d",
  storageBucket: "gramchain-a490d.firebasestorage.app",
  messagingSenderId: "414433921482",
  appId: "1:414433921482:web:a440a638302c64d2e86733",
  measurementId: "G-0S8QVD2RX4"
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider to always show account selection
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Analytics only on client side
if (typeof window !== 'undefined') {
  getAnalytics(app);
}

// Auth functions
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Create user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      role: null,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
    });
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    console.error('Signup error:', error);
    let errorMessage = 'An error occurred during sign up';
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already registered';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password should be at least 6 characters';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Email/password accounts are not enabled';
        break;
    }
    return { user: null, error: errorMessage };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    console.error('Signin error:', error);
    let errorMessage = 'An error occurred during sign in';
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password';
        break;
    }
    return { user: null, error: errorMessage };
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Create user document in Firestore if it doesn't exist
    await setDoc(doc(db, 'users', result.user.uid), {
      email: result.user.email,
      role: null,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
    }, { merge: true }); // merge: true will not overwrite if document exists
    return { user: result.user, error: null };
  } catch (error: any) {
    console.error('Google signin error:', error);
    let errorMessage = 'An error occurred during Google sign in';
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        errorMessage = 'Sign-in popup was closed';
        break;
      case 'auth/popup-blocked':
        errorMessage = 'Sign-in popup was blocked by the browser';
        break;
      case 'auth/cancelled-popup-request':
        errorMessage = 'Sign-in was cancelled';
        break;
      case 'auth/account-exists-with-different-credential':
        errorMessage = 'An account already exists with this email';
        break;
      case 'auth/unauthorized-domain':
        errorMessage = 'This domain is not authorized for Google sign-in';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Google sign-in is not enabled. Please contact support.';
        break;
    }
    return { user: null, error: errorMessage };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    console.error('Logout error:', error);
    return { error: 'An error occurred during logout' };
  }
}; 