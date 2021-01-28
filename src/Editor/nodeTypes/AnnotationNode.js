import React, { memo } from "react";
import "./nodestyles.css";

export default function ScreenBlockNode({ data }) {
  // So we can check for all node elements easily
  data.isNode = true;

  return (
    <div className='node-annotationnode' style={{backgroundImage:`url(/annotations/${data.annotation}-circle.svg)`}} >
      
    </div>
  );
}
