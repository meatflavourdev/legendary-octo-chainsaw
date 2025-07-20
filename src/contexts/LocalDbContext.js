import React, { useContext, useState, useEffect } from 'react';
import localStorageAdapter from '../localDb/localStorageAdapter';
import { anonymousAnimalAvatar } from '../helpers/nameGenerators';
import { getColor } from '../helpers/goldenColorHash';
import { v4 as uuidv4 } from 'uuid';

// Create context
const LocalDbContext = React.createContext();

// Custom hook to use the LocalDb context
export function useLocalDb() {
  return useContext(LocalDbContext);
}

// Provider component
export function LocalDbProvider({ children }) {
  const [isLocalMode, setIsLocalMode] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [clientID, setClientID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [colorSeed, setColorSeed] = useState(uuidv4());
  
  // Generate anonymous user profile
  const anonProfile = anonymousAnimalAvatar('./img/');
  const [anonUser, setAnonUser] = useState({
    displayName: anonProfile.name,
    photoURL: anonProfile.url,
    collabColor: getColor(50, colorSeed),
  });

  // Auth methods
  function signup(email, password) {
    return localStorageAdapter.auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return localStorageAdapter.auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return localStorageAdapter.auth.signOut();
  }

  function resetPassword(email) {
    return localStorageAdapter.auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    // This would be implemented in a real app
    console.log(`Email updated to ${email} (mock)`);
    return Promise.resolve();
  }

  function updatePassword(password) {
    // This would be implemented in a real app
    console.log(`Password updated (mock)`);
    return Promise.resolve();
  }

  function signInAnonymously() {
    return localStorageAdapter.auth.signInAnonymously();
  }

  // Document methods
  function getDocuments() {
    return localStorageAdapter.firestore.collection('documents').get();
  }

  function getDocument(docId) {
    return localStorageAdapter.firestore.collection('documents').doc(docId).get();
  }

  function createDocument(data) {
    return localStorageAdapter.firestore.collection('documents').add(data);
  }

  function updateDocument(docId, data) {
    return localStorageAdapter.firestore.collection('documents').doc(docId).update(data);
  }

  function deleteDocument(docId) {
    return localStorageAdapter.firestore.collection('documents').doc(docId).delete();
  }

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = localStorageAdapter.auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser({
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
          collabColor: user.collabColor || getColor(50, colorSeed),
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Context value
  const value = {
    isLocalMode,
    setIsLocalMode,
    currentUser,
    clientID,
    colorSeed,
    setClientID,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    signInAnonymously,
    getDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument
  };

  return (
    <LocalDbContext.Provider value={value}>
      {!loading && children}
    </LocalDbContext.Provider>
  );
}

export default LocalDbContext;