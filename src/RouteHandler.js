import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Editor from "./Editor/Editor";
import Error from "./Error";
import YjsTest from "./YjsTest";
import firebaseAuth from "./firebase/firebaseAuth";
import cloudFirestore from "./firebase/cloudFirestore";

function RouteHandler() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/app" component={Editor} />
          <Route exact path="/error" component={Error} />
          <Route exact path="/yjstest" component={YjsTest} />
          <Route exact path="/firebaseauth" component={firebaseAuth} />
        <Route exact path="/cloudfirestore" component={cloudFirestore} />
          <Route path="/:doc_id" component={Editor} />
        </Switch>
    </Router>
  );
}

export default RouteHandler;
