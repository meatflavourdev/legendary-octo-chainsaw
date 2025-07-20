import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme';
import './index.css';
import RouteHandler from './RouteHandler';
//import reportWebVitals from './reportWebVitals';

// Import Firebase dependencies conditionally
import firebase from 'firebase/app';
import "firebase/firestore";
import { FirebaseAuthConsumer, FirebaseAuthProvider } from '@react-firebase/auth';
import { FirestoreProvider } from '@react-firebase/firestore';
import { firebaseConfig } from './firebase/firebaseConfig';

// Import local DB provider
import { LocalDbProvider } from './contexts/LocalDbContext';

// Check if we're in local mode
const isLocalMode = process.env.REACT_APP_LOCAL_MODE !== 'false';

// Initialize LogRocket only in production mode
if (process.env.NODE_ENV === 'production' && !isLocalMode) {
  const LogRocket = require('logrocket');
  LogRocket.init('f9lgjx/entropy');
}

// Render the app with the appropriate providers based on mode
ReactDOM.render(
  <React.StrictMode>
    {isLocalMode ? (
      // Local mode - use LocalDbProvider
      <LocalDbProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouteHandler />
        </ThemeProvider>
      </LocalDbProvider>
    ) : (
      // Cloud mode - use Firebase providers
      <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
        <FirestoreProvider {...firebaseConfig} firebase={firebase}>
          <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
              if (user && process.env.NODE_ENV === 'production') {
                console.log(`Logrocket identify user: ${user.displayName}`);
                const LogRocket = require('logrocket');
                LogRocket.identify(user.uid, {
                  name: user.displayName,
                  email: user.email,
                  isAnonymous: user.isAnonymous,
                });
              }
            }}
          </FirebaseAuthConsumer>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouteHandler />
          </ThemeProvider>
        </FirestoreProvider>
      </FirebaseAuthProvider>
    )}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
