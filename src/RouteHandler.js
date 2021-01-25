import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import Editor from "./Editor/Editor";
import Error from "./Error";
import YjsTest from "./yjsSubscriber/YjsTest";
import firebaseAuth from "./firebase/firebaseAuth";
import cloudFirestore from "./firebase/cloudFirestore";
import MenuAppBar from "./components/MenuAppBar";
import Landing from "./Landing/Landing";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

const auth = firebase.auth();

function RouteHandler() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/app">
            {!user ? <Redirect to="/login" /> : <Editor />}
          </Route>
          <Route exact path="/error" component={Error} />
          <Route exact path="/editor" component={MenuAppBar} />
          <Route exact path="/yjstest" component={YjsTest} />
          <Route exact path="/firebaseauth" component={firebaseAuth} />
          <Route exact path="/cloudfirestore" component={cloudFirestore} />
          <Route path="/:doc_id" component={Editor} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default RouteHandler;
