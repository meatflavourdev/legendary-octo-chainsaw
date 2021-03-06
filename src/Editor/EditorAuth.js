import React from 'react';
import Editor from './Editor';
import { makeStyles } from '@material-ui/core/styles';

import { anonymousAnimalAvatar } from '../helpers/nameGenerators';

import firebase from "firebase";
import { useAuth } from '../contexts/AuthContext';

import ScaleLoader from '@bit/davidhu2000.react-spinners.scale-loader';

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
    const classes = useStyles();

      return (
        <div className={classes.editorAuth}>
          <ScaleLoader height={80} width={20} color='#b4b3fb' />
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
