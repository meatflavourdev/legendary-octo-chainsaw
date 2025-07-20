import React, { useContext, useState, useEffect } from "react";
import { anonymousAnimalAvatar } from '../helpers/nameGenerators';
import { getColor } from '../helpers/goldenColorHash';
import { v4 as uuidv4 } from 'uuid';
import { useLocalDb } from './LocalDbContext';

// Conditionally import Firebase auth
let auth;
try {
  auth = require("../firebase").auth;
} catch (error) {
  console.log("Firebase auth not available, using local auth");
  auth = null;
}

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Check if we're in local mode
  const localDb = useLocalDb();
  const isLocalMode = localDb ? true : false;

  const anonProfile = anonymousAnimalAvatar('./img/');
  const [colorSeed, setColorSeed] = useState(uuidv4());
  const [anonUser, setAnonUser] = useState({
    displayName: anonProfile.name,
    photoURL: anonProfile.url,
    collabColor: getColor(50, colorSeed),
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [clientID, setClientID] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auth functions that work in both modes
  function signup(email, password) {
    if (isLocalMode && localDb) {
      return localDb.signup(email, password);
    } else if (auth) {
      return auth.createUserWithEmailAndPassword(email, password);
    }
    return Promise.reject(new Error("Auth not available"));
  }

  function login(email, password) {
    if (isLocalMode && localDb) {
      return localDb.login(email, password);
    } else if (auth) {
      return auth.signInWithEmailAndPassword(email, password);
    }
    return Promise.reject(new Error("Auth not available"));
  }

  function logout() {
    if (isLocalMode && localDb) {
      return localDb.logout();
    } else if (auth) {
      return auth.signOut();
    }
    return Promise.reject(new Error("Auth not available"));
  }

  function resetPassword(email) {
    if (isLocalMode && localDb) {
      return localDb.resetPassword(email);
    } else if (auth) {
      return auth.sendPasswordResetEmail(email);
    }
    return Promise.reject(new Error("Auth not available"));
  }

  function updateEmail(email) {
    if (isLocalMode && localDb) {
      return localDb.updateEmail(email);
    } else if (auth && currentUser) {
      return currentUser.updateEmail(email);
    }
    return Promise.reject(new Error("Auth not available"));
  }

  function updatePassword(password) {
    if (isLocalMode && localDb) {
      return localDb.updatePassword(password);
    } else if (auth && currentUser) {
      return currentUser.updatePassword(password);
    }
    return Promise.reject(new Error("Auth not available"));
  }

  // Set up auth state listener
  useEffect(() => {
    let unsubscribe;

    if (isLocalMode && localDb) {
      // Use local auth
      unsubscribe = localDb.currentUser ? 
        () => setCurrentUser(localDb.currentUser) : 
        () => {};
      
      if (localDb.currentUser) {
        setCurrentUser({
          ...localDb.currentUser,
          collabColor: getColor(50, colorSeed),
        });
      }
      setLoading(false);
    } else if (auth) {
      // Use Firebase auth
      unsubscribe = auth.onAuthStateChanged(user => {
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
            collabColor: getColor(50, colorSeed),
          });
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      });
    } else {
      // No auth available, create anonymous user
      const anonymousUser = {
        displayName: anonProfile.name,
        photoURL: anonProfile.url,
        email: null,
        phoneNumber: null,
        providerId: 'anonymous',
        uid: uuidv4(),
        emailVerified: false,
        isAnonymous: true,
        creationTime: new Date().toISOString(),
        lastSignInTime: new Date().toISOString(),
        collabColor: getColor(50, colorSeed),
      };
      
      setCurrentUser(anonymousUser);
      setLoading(false);
      unsubscribe = () => {};
    }

    return unsubscribe;
  }, [isLocalMode]);

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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
