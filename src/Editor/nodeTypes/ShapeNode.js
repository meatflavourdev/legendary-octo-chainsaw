import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import "./nodestyles.css";
import classNames from "classnames";

  // So we can check for all node elements easily
export default function ShapeNode({ data }) {

  data.idNode = true;

  const nodeClasses = classNames({
    'node-shapenode': true,
    'filled': data.fillStyle === 'filled',
    'outlined': data.fillStyle === 'outlined',
    'dashed': data.fillStyle === 'dashed',
    'dark': data.fillColor === 'dark',
    'light': data.fillColor === 'light',
    'red': data.fillColor === 'red',
    'green': data.fillColor === 'green',
    'blue': data.fillColor === 'blue',
    'purple': data.fillColor === 'purple',
    'shapeTerminator': data.shape === 'term',
    'shapeDecision': data.shape === 'decision'
  });

  return (
    <div className={nodeClasses}>
      <Handle
        type="source"
        className='react-flow__handle-shapenode'
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
        id='a'
      />
      <Handle
        type="source"
        className='react-flow__handle-shapenode'
        position="left"
        onConnect={(params) => console.log('handle onConnect', params)}
        id='b'
      />
        <div className="shapenode-text">{data.label}</div>
      <Handle
        type="source"
        className='react-flow__handle-shapenode'
        position="right"
        onConnect={(params) => console.log('handle onConnect', params)}
        id='c'
      />
      <Handle
        type="source"
        className='react-flow__handle-shapenode'
        position="bottom"
        onConnect={(params) => console.log('handle onConnect', params)}
        id='d'
      />
    </div>
  );
}
