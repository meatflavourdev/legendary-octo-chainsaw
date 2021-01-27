import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import "./nodestyles.css";
import classNames from "classnames";

  // So we can check for all node elements easily
export default function HandleNode({ data }) {

  data.idNode = true;
  const nodeClasses = classNames({
    'node-handlenode': true,
    'outlined': data.fillStyle === 'filled' || data.fillStyle === 'outlined',
    'dashed': data.fillStyle === 'dashed',
    'dark': data.fillColor === 'dark',
    'light': data.fillColor === 'light',
    'red': data.fillColor === 'red',
    'green': data.fillColor === 'green',
    'blue': data.fillColor === 'blue',
    'purple': data.fillColor === 'purple',
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
    </div>
  );
}
