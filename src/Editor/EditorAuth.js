import React from 'react';
import Editor from './Editor';

import { anonymousAnimalAvatar } from '../helpers/nameGenerators';

import firebase from "firebase";
import { useAuth } from '../contexts/AuthContext';

export default function EditorAuth() {

  const { currentUser } = useAuth();

  React.useEffect(() => {
    console.log('currentUser: ', currentUser);
    if (!currentUser?.displayName) {
      console.log('No user found-- Generating anonymous user...');
      firebase
        .auth()
        .signInAnonymously();
    }
  }, [currentUser]);

    function Authenticated() {
      return (
        <div>
          <h1>Not logged in...</h1>
        </div>
      );
    }


  return (
    <>
    {currentUser
      ? <Editor />
      : <Authenticated />
      }
    </>
  );
}
