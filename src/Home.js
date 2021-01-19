import { Link } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <img src={logo} className="App-logo" alt="logo" />
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
            <Link to="/yjstest">Yjs Integration Test</Link>
          </li>
          <li>
            <Link to="/11b18ea5-bfdf-4421-a1a0-3609692408fd">Example link to document with UUID</Link>
          </li>
        </ul>
    </div>
  );
}

export default Home;
