import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import "./nodestyles.css";
import classNames from "classnames";

export default function ScreenBlockNode({ style, data }) {
  // So we can check for all node elements easily
  data.isNode = true;

  const nodeClasses = classNames({
    "node-screenblock": true,
  });


  const screenBlockStyle = `background-image: url(/screenblocks/page-${data.screenBlockID ? data.screenBlockID.toString().padStart(2, "0") : '01'}.svg)`;

  return (
    <div style={screenBlockStyle} className={nodeClasses}>
      <Handle
        type="source"
        className="react-flow__handle-screenblocknode"
        position="top"
        onConnect={(params) => console.log("handle onConnect", params)}
        id="a"
      />
      <Handle
        type="source"
        className="react-flow__handle-screenblocknode"
        position="left"
        onConnect={(params) => console.log("handle onConnect", params)}
        id="b"
      />
      <div>
      <span className="screenblocknode-text"></span>
      </div>
      <Handle
        type="source"
        className="react-flow__handle-screenblocknode"
        position="right"
        onConnect={(params) => console.log("handle onConnect", params)}
        id="c"
      />
      <Handle
        type="source"
        className="react-flow__handle-screenblocknode"
        position="bottom"
        onConnect={(params) => console.log("handle onConnect", params)}
        id="d"
      />
    </div>
  );
}
