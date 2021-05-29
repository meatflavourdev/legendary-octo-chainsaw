import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme';
import './index.css';
import RouteHandler from './RouteHandler';
//import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from './firebase/firebaseConfig';
import { FirebaseAuthConsumer, FirebaseAuthProvider } from '@react-firebase/auth';
import { FuegoProvider } from '@metamist/swr-firestore';
import { Fuego } from './firebase/Fuego';
import LogRocket from 'logrocket';
LogRocket.init('f9lgjx/entropy');

const fuego = new Fuego(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          user && console.log(`Logrocket identify user: ${user.displayName}`);
          user &&
            LogRocket.identify(user.uid, {
              name: user.displayName,
              email: user.email,
              isAnonymous: user.isAnonymous,
            });
        }}
      </FirebaseAuthConsumer>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FuegoProvider fuego={fuego}>
          <RouteHandler />
        </FuegoProvider>
      </ThemeProvider>
    </FirebaseAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
