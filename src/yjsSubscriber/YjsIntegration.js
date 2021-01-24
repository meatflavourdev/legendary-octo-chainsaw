import React, { useState } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IfFirebaseAuthed } from '@react-firebase/auth';

const doc = new Y.Doc();
const USER_ID = Math.random();

const useCollaborativeArray = (name) => {
  const valueRef = React.useRef(doc.getArray(name));
  const [state, setState] = React.useState(null);
  React.useEffect(() => {
    valueRef.current.observe((event) => {
      setState(valueRef.current.toArray());
    });
  }, []);
  return {
    value: state,
    insertValue: (i, v) => valueRef.current.insert(i, [v]),
    pushValue: (v) => valueRef.current.push([v]),
  };
};

function Button({ addItem }) {
  return <button onClick={addItem}>Add</button>;
}

function useInput({ type }) {
  const [value, setValue] = useState('');
  const input = <input value={value} onChange={(e) => setValue(e.target.value)} type={type} />;
  return [value, input];
}

function TestApp() {
  const [text, textInput] = useInput({ type: 'text' });
  const { value, insertValue, pushValue } = useCollaborativeArray('test');
  React.useEffect(() => {
    const wsProvider = new WebsocketProvider('ws://localhost:5001', 'my-roomname', doc);
    wsProvider.on('status', (event) => {
      console.log(event.status); // logs "connected" or "disconnected"
    });
    return () => wsProvider.destroy();
  }, []);
  if (value) {
    return (
      <IfFirebaseAuthed>
        {({ isSignedIn, user, providerId }) => {
          return (
            <div className="App">
              <Button addItem={() => pushValue([(user && user.displayName), text])} />
              <label>
                Text:
                {textInput}
              </label>
              <ul>
              {value.map((v) => (
                <div><strong>{v[0]} : </strong>{v[1]}</div>
              ))}
              </ul>
            </div>
          );
        }}
      </IfFirebaseAuthed>
    );
  }
  return <Button addItem={() => pushValue(USER_ID)} />;
}

export default TestApp;
