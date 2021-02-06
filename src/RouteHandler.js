import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Landing from "./Landing/Landing";
import Login from "./Login";
import SignUp from "./SignUp";
import Admin from "./Admin";
import YjsTest from "./yjsSubscriber/YjsTest";
import YjsFlowTest from "./yjsSubscriber/YjsFlowTest";
import firebaseAuth from "./firebase/firebaseAuth";
import cloudFirestore from "./firebase/cloudFirestore";
import Error from "./Error";
import Editor from "./Editor/Editor";

import { AuthProvider } from "./contexts/AuthContext"

function RouteHandler() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/admin" component={Admin} />

          <Route exact path="/yjstest" component={YjsTest} />
          <Route exact path="/yjsflowtest" component={YjsFlowTest} />
          <Route exact path="/firebaseauth" component={firebaseAuth} />
          <Route exact path="/cloudfirestore" component={cloudFirestore} />

          <Route exact path="/error" component={Error} />

          <Route exact path="/app">
            <Editor />
          </Route>
          <Route path="/:doc_id" component={Editor} />

        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default RouteHandler;
