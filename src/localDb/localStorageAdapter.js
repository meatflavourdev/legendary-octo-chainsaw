/**
 * Local Storage Adapter
 * 
 * This module provides a Firebase-like API for local storage,
 * allowing the application to work without Firebase in demo mode.
 */

import { v4 as uuidv4 } from 'uuid';
import { anonymousAnimalAvatar } from '../helpers/nameGenerators';
import { getColor } from '../helpers/goldenColorHash';

// Local storage keys
const USERS_KEY = 'legendary_octo_chainsaw_users';
const CURRENT_USER_KEY = 'legendary_octo_chainsaw_current_user';
const DOCUMENTS_KEY = 'legendary_octo_chainsaw_documents';

// Initialize local storage with default values if not present
const initializeLocalStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(DOCUMENTS_KEY)) {
    localStorage.setItem(DOCUMENTS_KEY, JSON.stringify([]));
  }
};

// Auth methods
const auth = {
  currentUser: null,
  
  // Initialize auth from local storage
  init() {
    initializeLocalStorage();
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }
    return this;
  },
  
  // Create a new user
  createUserWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem(USERS_KEY));
      
      // Check if user already exists
      if (users.find(user => user.email === email)) {
        reject(new Error('User already exists'));
        return;
      }
      
      // Create new user
      const newUser = {
        uid: uuidv4(),
        email,
        password, // In a real app, this would be hashed
        displayName: email.split('@')[0],
        photoURL: null,
        emailVerified: false,
        isAnonymous: false,
        metadata: {
          creationTime: new Date().toISOString(),
          lastSignInTime: new Date().toISOString()
        }
      };
      
      // Save user
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Set as current user
      this.currentUser = newUser;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      
      resolve({ user: newUser });
    });
  },
  
  // Sign in with email and password
  signInWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem(USERS_KEY));
      const user = users.find(user => user.email === email && user.password === password);
      
      if (!user) {
        reject(new Error('Invalid email or password'));
        return;
      }
      
      // Update last sign in time
      user.metadata.lastSignInTime = new Date().toISOString();
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Set as current user
      this.currentUser = user;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      
      resolve({ user });
    });
  },
  
  // Sign in anonymously
  signInAnonymously() {
    return new Promise((resolve) => {
      const anonProfile = anonymousAnimalAvatar('./img/');
      const colorSeed = uuidv4();
      
      const anonymousUser = {
        uid: uuidv4(),
        displayName: anonProfile.name,
        photoURL: anonProfile.url,
        email: null,
        phoneNumber: null,
        providerId: 'anonymous',
        isAnonymous: true,
        emailVerified: false,
        collabColor: getColor(50, colorSeed),
        metadata: {
          creationTime: new Date().toISOString(),
          lastSignInTime: new Date().toISOString()
        }
      };
      
      // Set as current user
      this.currentUser = anonymousUser;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(anonymousUser));
      
      resolve({ user: anonymousUser });
    });
  },
  
  // Sign out
  signOut() {
    return new Promise((resolve) => {
      this.currentUser = null;
      localStorage.removeItem(CURRENT_USER_KEY);
      resolve();
    });
  },
  
  // Set up auth state change listener
  onAuthStateChanged(callback) {
    // Initial call with current state
    if (this.currentUser) {
      callback(this.currentUser);
    } else {
      callback(null);
    }
    
    // Set up storage event listener to detect changes from other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === CURRENT_USER_KEY) {
        const newUser = event.newValue ? JSON.parse(event.newValue) : null;
        this.currentUser = newUser;
        callback(newUser);
      }
    });
    
    // Return unsubscribe function
    return () => {
      window.removeEventListener('storage', () => {});
    };
  },
  
  // Send password reset email (mock)
  sendPasswordResetEmail(email) {
    return new Promise((resolve) => {
      console.log(`Password reset email sent to ${email} (mock)`);
      resolve();
    });
  }
};

// Firestore methods
const firestore = {
  // Get a collection reference
  collection(collectionName) {
    return {
      // Add a document to the collection
      add(data) {
        return new Promise((resolve) => {
          const collection = JSON.parse(localStorage.getItem(`${collectionName}_collection`) || '[]');
          const newDoc = {
            id: uuidv4(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          collection.push(newDoc);
          localStorage.setItem(`${collectionName}_collection`, JSON.stringify(collection));
          
          resolve({ id: newDoc.id });
        });
      },
      
      // Get a document reference
      doc(docId) {
        return {
          // Get the document
          get() {
            return new Promise((resolve) => {
              const collection = JSON.parse(localStorage.getItem(`${collectionName}_collection`) || '[]');
              const doc = collection.find(doc => doc.id === docId);
              
              resolve({
                exists: !!doc,
                data: () => doc,
                id: docId
              });
            });
          },
          
          // Set document data
          set(data, options = {}) {
            return new Promise((resolve) => {
              const collection = JSON.parse(localStorage.getItem(`${collectionName}_collection`) || '[]');
              const index = collection.findIndex(doc => doc.id === docId);
              
              if (index === -1) {
                // Document doesn't exist, create it
                const newDoc = {
                  id: docId,
                  ...data,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                };
                
                collection.push(newDoc);
              } else {
                // Document exists, update it
                if (options.merge) {
                  collection[index] = {
                    ...collection[index],
                    ...data,
                    updatedAt: new Date().toISOString()
                  };
                } else {
                  collection[index] = {
                    id: docId,
                    ...data,
                    createdAt: collection[index].createdAt,
                    updatedAt: new Date().toISOString()
                  };
                }
              }
              
              localStorage.setItem(`${collectionName}_collection`, JSON.stringify(collection));
              resolve();
            });
          },
          
          // Update document data
          update(data) {
            return new Promise((resolve) => {
              const collection = JSON.parse(localStorage.getItem(`${collectionName}_collection`) || '[]');
              const index = collection.findIndex(doc => doc.id === docId);
              
              if (index !== -1) {
                collection[index] = {
                  ...collection[index],
                  ...data,
                  updatedAt: new Date().toISOString()
                };
                
                localStorage.setItem(`${collectionName}_collection`, JSON.stringify(collection));
              }
              
              resolve();
            });
          },
          
          // Delete the document
          delete() {
            return new Promise((resolve) => {
              const collection = JSON.parse(localStorage.getItem(`${collectionName}_collection`) || '[]');
              const filteredCollection = collection.filter(doc => doc.id !== docId);
              
              localStorage.setItem(`${collectionName}_collection`, JSON.stringify(filteredCollection));
              resolve();
            });
          }
        };
      },
      
      // Get all documents in the collection
      get() {
        return new Promise((resolve) => {
          const collection = JSON.parse(localStorage.getItem(`${collectionName}_collection`) || '[]');
          
          resolve({
            docs: collection.map(doc => ({
              id: doc.id,
              data: () => doc,
              exists: true
            })),
            empty: collection.length === 0
          });
        });
      },
      
      // Query the collection
      where(field, operator, value) {
        return {
          get() {
            return new Promise((resolve) => {
              const collection = JSON.parse(localStorage.getItem(`${collectionName}_collection`) || '[]');
              
              let filteredDocs = collection;
              
              // Apply filter based on operator
              switch (operator) {
                case '==':
                  filteredDocs = collection.filter(doc => doc[field] === value);
                  break;
                case '!=':
                  filteredDocs = collection.filter(doc => doc[field] !== value);
                  break;
                case '>':
                  filteredDocs = collection.filter(doc => doc[field] > value);
                  break;
                case '>=':
                  filteredDocs = collection.filter(doc => doc[field] >= value);
                  break;
                case '<':
                  filteredDocs = collection.filter(doc => doc[field] < value);
                  break;
                case '<=':
                  filteredDocs = collection.filter(doc => doc[field] <= value);
                  break;
                default:
                  break;
              }
              
              resolve({
                docs: filteredDocs.map(doc => ({
                  id: doc.id,
                  data: () => doc,
                  exists: true
                })),
                empty: filteredDocs.length === 0
              });
            });
          }
        };
      }
    };
  }
};

// Initialize local storage
initializeLocalStorage();

// Export the local storage adapter
export const localStorageAdapter = {
  auth: auth.init(),
  firestore
};

export default localStorageAdapter;