import * as React from 'react';
import './App.css';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

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

function TestApp() {
  const { value, insertValue, pushValue } = useCollaborativeArray('test');
  React.useEffect(() => {
    const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', doc);
    wsProvider.on('status', (event) => {
      console.log(event.status); // logs "connected" or "disconnected"
    });
    return () => wsProvider.destroy();
  }, []);
  if (value) {
    return (
      <div className="App">
        <Button addItem={() => pushValue(USER_ID)} />
        {value.map((v) => (
          <div>{v}</div>
        ))}
      </div>
    );
  }
  return <Button addItem={() => pushValue(USER_ID)} />;
}

export default TestApp;
