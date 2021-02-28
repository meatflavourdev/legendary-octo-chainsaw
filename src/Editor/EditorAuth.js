import React from 'react';
import Editor from './Editor';

import firebase from "firebase";
import { useAuth } from '../contexts/AuthContext';

export default function EditorAuth() {

  const { currentUser, updateProfile } = useAuth();

  //React.useEffect(() => {
    console.log('currentUser: ', currentUser);
    if (currentUser) {
      console.log('No user found-- Signing user in anonymously...');
      firebase
        .auth()
        .signInAnonymously()
        .then(() => {
          console.log('updating user profile..: ', currentUser);
          updateProfile({
            displayName: 'Test Name',
            photoURL: null,
          })
      })
    }

    function Authenticated({currentUser}) {
      if (currentUser) {
        return <Editor />;
      }
      return (
        <div>
          <h1>Not logged in...</h1>
        </div>
      );
    }


  return (
    <Authenticated currentUser={currentUser}/>
  );
}
