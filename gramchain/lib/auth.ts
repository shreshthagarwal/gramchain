'use client';

import { useState, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  User as FirebaseUser,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as firebaseOnAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { app } from './firebase';

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Extend Firebase User type with our custom properties
export interface User extends FirebaseUser {
  role?: 'investor' | 'entrepreneur';
  onboardingCompleted?: boolean;
}

// Types
export type AuthResponse = {
  user: User | null;
  error: string | null;
};

export type UserProfileUpdate = {
  displayName?: string;
  role?: 'investor' | 'entrepreneur';
  onboardingCompleted?: boolean;
  investorProfile?: {
    investmentRange: string;
    preferredIndustries: string[];
    investmentExperience: string;
    linkedInProfile: string;
    investmentHistory: string;
  };
  entrepreneurProfile?: {
    companyName: string;
    industry: string;
    stage: string;
    description: string;
    website: string;
    pitchDeck: File | null;
    teamSize: string;
    fundingNeeded: string;
  };
};

// Auth functions
export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
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

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
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

export const signInWithGoogle = async (): Promise<AuthResponse> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Check if user document exists, if not create it
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        role: null,
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      });
    }
    
    return { user: result.user, error: null };
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    let errorMessage = 'An error occurred during Google sign-in';
    
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        errorMessage = 'Sign-in popup was closed before completing';
        break;
      case 'auth/popup-blocked':
        errorMessage = 'Sign-in popup was blocked by the browser';
        break;
      case 'auth/cancelled-popup-request':
        errorMessage = 'Sign-in was cancelled';
        break;
    }
    
    return { user: null, error: errorMessage };
  }
};

export const logOut = async (): Promise<{ error: string | null }> => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    console.error('Logout error:', error);
    return { error: 'An error occurred during logout' };
  }
};

export const updateUserProfile = async (profileData: UserProfileUpdate): Promise<{ error: string | null }> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { error: 'No user is currently signed in' };
    }

    // Update display name if provided
    if (profileData.displayName) {
      await updateProfile(user, { displayName: profileData.displayName });
    }

    // Create a copy of the profile data without the pitchDeck
    const profileDataForFirestore = {
      ...profileData,
      entrepreneurProfile: profileData.entrepreneurProfile ? {
        ...profileData.entrepreneurProfile,
        pitchDeck: null // Remove the File object
      } : undefined
    };

    // Update user document in Firestore
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      role: profileDataForFirestore.role,
      onboardingCompleted: profileDataForFirestore.onboardingCompleted,
      ...(profileDataForFirestore.investorProfile && { investorProfile: profileDataForFirestore.investorProfile }),
      ...(profileDataForFirestore.entrepreneurProfile && { entrepreneurProfile: profileDataForFirestore.entrepreneurProfile }),
    }, { merge: true });

    return { error: null };
  } catch (error: any) {
    console.error('Profile update error:', error);
    return { error: 'Failed to update profile' };
  }
};

interface UserData {
  role?: 'investor' | 'entrepreneur';
  onboardingCompleted?: boolean;
  email?: string;
  createdAt?: string;
  investorProfile?: {
    investmentRange: string;
    preferredIndustries: string[];
    investmentExperience: string;
    linkedInProfile: string;
    investmentHistory: string;
  };
  entrepreneurProfile?: {
    companyName: string;
    industry: string;
    stage: string;
    description: string;
    website: string;
    teamSize: string;
    fundingNeeded: string;
  };
}

interface AuthState {
  user: User | null;
  loading: boolean;
  userData: UserData | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    userData: null,
  });

  useEffect(() => {
    const unsubscribe = firebaseOnAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      if (user) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data() as UserData | undefined;
        
        setAuthState({
          user: { ...user, ...userData } as User,
          loading: false,
          userData: userData || null,
        });
      } else {
        setAuthState({
          user: null,
          loading: false,
          userData: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return authState;
} 