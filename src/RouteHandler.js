import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Editor from "./Editor/Editor";
import Error from "./Error";

function RouteHandler() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/app">
            <Editor />
          </Route>
          <Route path="/error">
            <Error />
          </Route>
          <Route path="/:doc_id" >
            <Editor />
          </Route>
        </Switch>
    </Router>
  );
}

export default RouteHandler;
