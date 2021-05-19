import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

import { anonymousAnimalAvatar } from '../helpers/nameGenerators';
import { getColor } from '../helpers/goldenColorHash';
const uuid62 = require("uuid62");

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const anonProfile = anonymousAnimalAvatar('./img/');
  const [colorSeed, setColorSeed] = useState(uuid62.v4());
  const [anonUser, setAnonUser] = useState({
    displayName: anonProfile.name,
    photoURL: anonProfile.url,
    collabColor: getColor(50, colorSeed),
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
        collabColor: getColor(50, colorSeed),
      })
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    clientID,
    colorSeed,
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
