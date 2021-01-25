import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';
import './nodestyles.css';
import classNames from 'classnames';

export default memo(({ data }) => {
  
  const nodeClasses = classNames({
    'node-default': true,
    'filled': false,
    'outlined': true,
    'dashed': false,
    'dark': true,
    'light': false,
    'red': false,
    'green': false,
    'blue': false,
    'purple': false,
  });

  //return (<li className={liClasses}>{data.name}</li>);

  return (
    <div className={nodeClasses}>
      <Handle
        className='react-flow__handle-shapenode'
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{ background: '#000' }}
        id='a'
      />
      <Handle
        className='react-flow__handle-shapenode'
        position="left"
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{ background: '#000' }}
        id='b'
      />
      <div>
        <span className='shapenode-text'>Custom Color</span>
      </div>
      <Handle
        className='react-flow__handle-shapenode'
        position="right"
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{ background: '#000' }}
        id='c'
      />
      <Handle
        className='react-flow__handle-shapenode'
        position="bottom"
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{ background: '#000' }}
        id='d'
      />
    </div>
  );
})