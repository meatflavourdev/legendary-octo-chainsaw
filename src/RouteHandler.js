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
      <div>
        <ul className="navbar">
          <li>
            <Link to="/">Landing Page</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup"><button>Signup</button></Link>
          </li>
          <li>
            <Link to="/app">Editor</Link>
          </li>
          <li>
            <Link to="/error">Error Page (placeholder)</Link>
          </li>
          <li>
            <Link to="/11b18ea5-bfdf-4421-a1a0-3609692408fd">Example link to document with UUID</Link>
          </li>
        </ul>

        <hr />
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
      </div>
    </Router>
  );
}

export default RouteHandler;
