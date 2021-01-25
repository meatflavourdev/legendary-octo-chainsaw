import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';
import './nodestyles.css';
import classNames from 'classnames';

export default memo(({ data }) => {
  
  data.isNode = true;

  const nodeClasses = classNames({
    'node-default': true,
    'filled': data.fillStyle === 'filled',
    'outlined': data.fillStyle === 'outlined',
    'dashed': data.fillStyle === 'dashed',
    'dark': data.fillColor === 'dark',
    'light': data.fillColor === 'light',
    'red': data.fillColor === 'red',
    'green': data.fillColor === 'green',
    'blue': data.fillColor === 'blue',
    'purple': data.fillColor === 'purple'
  });

  return (
    <div className={nodeClasses}>
      <Handle
        className='react-flow__handle-shapenode'
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
        id='a'
      />
      <Handle
        className='react-flow__handle-shapenode'
        position="left"
        onConnect={(params) => console.log('handle onConnect', params)}
        id='b'
      />
      <div>
        <span className='shapenode-text'>Custom Color</span>
      </div>
      <Handle
        className='react-flow__handle-shapenode'
        position="right"
        onConnect={(params) => console.log('handle onConnect', params)}
        id='c'
      />
      <Handle
        className='react-flow__handle-shapenode'
        position="bottom"
        onConnect={(params) => console.log('handle onConnect', params)}
        id='d'
      />
    </div>
  );
})