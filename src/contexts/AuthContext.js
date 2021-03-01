import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { anonymousAnimalAvatar } from '../helpers/nameGenerators';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [anonUser, setAnonUser] = useState()

  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

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
        displayName: user.displayName|| anonUser.displayName || null,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL || anonUser.photoURL || null,
        providerId: user.providerId,
        uid: user.uid,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
      })
      setLoading(false)
    })

    return unsubscribe
  }, [anonUser])

  useEffect(() => {
    const anonProfile = anonymousAnimalAvatar('./img/');
    setAnonUser({
      displayName: anonProfile.name,
      photoURL: anonProfile.url,
    });
  }, [])

  const value = {
    currentUser,
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
