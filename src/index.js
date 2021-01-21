import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import './index.css';
import RouteHandler from './RouteHandler';
//import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import { FirebaseAuthConsumer, FirebaseAuthProvider } from '@react-firebase/auth';
import { firebaseConfig } from './firebase/firebaseConfig';
import LogRocket from 'logrocket';
LogRocket.init('f9lgjx/entropy');

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
            user && console.log(`Logrocket identify user: ${user.displayName}`);
              user && LogRocket.identify(user.uid, {
                name: user.displayName,
                email: user.email,
                isAnonymous: user.isAnonymous,
              });
            }}
        </FirebaseAuthConsumer>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouteHandler />
      </ThemeProvider>
      </FirebaseAuthProvider>
    ,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
