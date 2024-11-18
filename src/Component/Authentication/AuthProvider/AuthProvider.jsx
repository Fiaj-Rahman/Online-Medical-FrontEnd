import React, { createContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, sendPasswordResetEmail  } from "firebase/auth";
import { auth } from "../Firebase/firebase.confiq"; // Ensure path is correct

// Create Context for authentication
export const AuthContext = createContext(null);

// Translate Firebase error codes to user-friendly messages
const translateError = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/weak-password':
      return 'Password is too weak. Please choose a stronger password.';
    default:
      return 'Something went wrong. Please try again later.';
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // New state to handle errors
  const googleProvider = new GoogleAuthProvider();

  // Sign Up User function
  const signUpUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null); // Clear error on successful signup
    } catch (error) {
      setError(translateError(error.code)); // Set error message if signup fails
    }
  };

  // Login User function
  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null); // Clear error on successful login
    } catch (error) {
      setError(translateError(error.code)); // Set error message if login fails
    }
  };

  // Google Login function
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setError(null); // Clear error on successful Google login
    } catch (error) {
      setError(translateError(error.code)); // Set error message if Google login fails
    }
  };

  // Log Out function
  const logOut = async () => {
    try {
      await signOut(auth);
      setError(null); // Clear error on successful logout
    } catch (error) {
      setError(translateError(error.code)); // Set error message if logout fails
    }
  };

  // Password Reset function
  const resetPass = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return 'Password reset email sent successfully.'; // Success message
    } catch (error) {
      return translateError(error.code); // Translate and return error message
    }
  };





  // Use Firebase's onAuthStateChanged to monitor the user's login state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Set the user if logged in, null if logged out
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  // Context value to share with children components
  const authInfo = {
    signUpUser,
    loginUser,
    user,
    setUser,
    googleLogin,
    logOut,
    error, // Share the error state with children components
    resetPass,
    
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
