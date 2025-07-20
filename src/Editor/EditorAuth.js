import React from 'react';
import Editor from './Editor';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../contexts/AuthContext';
import { useLocalDb } from '../contexts/LocalDbContext';
import { ScaleLoader } from 'react-spinners';

// Conditionally import Firebase
let firebase;
try {
  firebase = require('firebase/app');
  require('firebase/auth');
} catch (error) {
  console.log("Firebase not available, using local auth");
  firebase = null;
}

const useStyles = makeStyles(() => ({
  editorAuth: {
    display: 'flex',
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function EditorAuth() {
  const { currentUser } = useAuth();
  const localDb = useLocalDb();
  const isLocalMode = localDb ? true : false;

  React.useEffect(() => {
    console.log('currentUser: ', currentUser);
    if (!currentUser?.displayName) {
      console.log('No user found-- Generating anonymous user...');
      
      if (isLocalMode && localDb) {
        // Use local anonymous sign-in
        localDb.signInAnonymously();
      } else if (firebase) {
        // Use Firebase anonymous sign-in
        firebase.auth().signInAnonymously();
      }
    }
  }, [currentUser, isLocalMode, localDb]);

  function AuthLoader() {
    const classes = useStyles();
    return (
      <div className={classes.editorAuth}>
        <ScaleLoader height={80} width={20} color="#b4b3fb" />
      </div>
    );
  }

  return <>{currentUser ? <Editor /> : <AuthLoader />}</>;
}
