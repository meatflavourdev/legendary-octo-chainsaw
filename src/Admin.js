import { Link } from "react-router-dom";
import React from "react"

import './App.css';

function Admin() {
  return (
    <div>
      <h2>Admin</h2>
      <ul className="adminMenu">
          <li>
            <Link to="/">Landing Page</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/app">Editor</Link>
          </li>
          <li>
            <Link to="/error">Error Page (placeholder)</Link>
          </li>
          <li>
            <Link to="/firebaseauth">Firebase Auth Test</Link>
          </li>
          <li>
            <Link to="/cloudfirestore">Cloud Firestore Test</Link>
          </li>
          <li>
            <Link to="/11b18ea5-bfdf-4421-a1a0-3609692408fd">Example link to document with UUID</Link>
          </li>
        </ul>
    </div>
  );
}

export default Admin;
