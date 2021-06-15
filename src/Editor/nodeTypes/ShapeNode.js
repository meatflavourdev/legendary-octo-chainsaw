import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';
import './nodestyles.css';
import classNames from 'classnames';
import { EditText, EditTextarea } from 'react-edit-text';
import { useBus } from 'react-bus';

// So we can check for all node elements easily
export default function ShapeNode({ id, data }) {
  //Event Bus
  const bus = useBus();

  data.idNode = true;

  const nodeClasses = classNames({
    'node-shapenode': true,
    filled: data.fillStyle === 'filled',
    outlined: data.fillStyle === 'outlined',
    dashed: data.fillStyle === 'dashed',
    dark: data.fillColor === 'dark',
    light: data.fillColor === 'light',
    red: data.fillColor === 'red',
    green: data.fillColor === 'green',
    blue: data.fillColor === 'blue',
    purple: data.fillColor === 'purple',
    shapeTerminator: data.shape === 'term',
    shapeDecision: data.shape === 'decision',
  });

  // Value of the content and input [in edit mode]
  const [text, setText] = useState(data.label);

  return (
    <div id={data.nodeKey} className={nodeClasses}>
      <Handle
        type="source"
        className="react-flow__handle-shapenode"
        position="top"
        //onConnect={(params) => console.log('handle onConnect', params)}
        id="a"
      />
      <Handle
        type="source"
        className="react-flow__handle-shapenode"
        position="left"
        //onConnect={(params) => console.log('handle onConnect', params)}
        id="b"
      />
      <EditText
        type="text"
        value={text}
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
          flexDirection: 'column',
          overflowX: 'auto',
          color: 'white',
          padding: '10px',
          fontSize: '1em',
          width: '100%',
          flex: 1,
          textAlign: 'center',
          overflowWrap: 'break-word',
          backgroundColor: 'transparent',
          border: 'none',
          padding: '1em',
          margin: '0',
          resize: 'none',
          outline: 'none',
          '&:focus': {
            border: 'none'
          },
        }}
        onChange={setText}
        onSave={() => bus.emit('updateNodeData', { id, data })}
      />

      <Handle
        type="source"
        className="react-flow__handle-shapenode"
        position="right"
        //onConnect={(params) => console.log('handle onConnect', params)}
        id="c"
      />
      <Handle
        type="source"
        className="react-flow__handle-shapenode"
        position="bottom"
        //onConnect={(params) => console.log('handle onConnect', params)}
        id="d"
      />
    </div>
  );
}
