import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "./contexts/AuthContext"
import EditorLayout from "./Editor/EditorLayout";
import Error from "./Error";
import YjsTest from "./yjsSubscriber/YjsTest";
import YjsFlowTest from "./yjsSubscriber/YjsFlowTest";
import firebaseAuth from "./firebase/firebaseAuth";
import cloudFirestore from "./firebase/cloudFirestore";
import Landing from "./Landing/Landing";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import ProviderFlow from './Editor/ProviderFlow';

import { useAuthState } from "react-firebase-hooks/auth";
import Admin from "./Home";

const auth = firebase.auth();

function RouteHandler() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/app">
            {/*!user ? <Redirect to="/Login" /> : <Editor />*/}
            <EditorLayout />
          </Route>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/error" component={Error} />
          <Route exact path="/yjstest" component={YjsTest} />
          <Route exact path="/yjsflowtest" component={YjsFlowTest} />
          <Route exact path="/firebaseauth" component={firebaseAuth} />
          <Route exact path="/cloudfirestore" component={cloudFirestore} />
          <Route path="/:doc_id" component={EditorLayout} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default RouteHandler;
