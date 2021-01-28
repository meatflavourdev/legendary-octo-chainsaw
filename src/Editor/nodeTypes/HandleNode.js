import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import "./nodestyles.css";

  // So we can check for all node elements easily
export default function HandleNode({ data }) {

  data.idNode = true;

  return (
    <div className='node-handlenode'>
      <div style={{width:'30px', height:'30px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '100%', backgroundColor: 'rgba(0,0,255,0.1)'}}>
        <div style={{width:'20px', height:'20px', display: 'flex', alignItems: 'center', borderRadius: '100%', backgroundColor: 'rgba(0,0,255,0.2)'}}>
          <Handle
            type="source"
            className='react-flow__handle-handlenode'
            position="top"
            //onConnect={(params) => console.log('handle onConnect', params)}
            id='a'
          />
        </div>
      </div>
    </div>
  );
}
