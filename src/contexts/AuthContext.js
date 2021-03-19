import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

import { anonymousAnimalAvatar } from '../helpers/nameGenerators';
import uniqolor from 'uniqolor';
const uuid62 = require("uuid62");

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const anonProfile = anonymousAnimalAvatar('./img/');
  const [seed, setSeed] = useState(uuid62.v4());
  const [anonUser, setAnonUser] = useState({
    displayName: anonProfile.name,
    photoURL: anonProfile.url,
    collabColor: generateColor(anonProfile.name, seed),
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [clientID, setClientID] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function generateColor(input, seed = '', options = { saturation: 95, lightness: 60, differencePoint: 170 }) {
    return {
      ...uniqolor(input + seed, options),
      seed,
    };
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      user && setCurrentUser({
        displayName: user.displayName || anonUser.displayName || null,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL || anonUser.photoURL || null,
        providerId: user.providerId,
        uid: user.uid,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
        collabColor: generateColor(anonProfile.name, seed),
      })
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    generateColor,
    clientID,
    setClientID,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
