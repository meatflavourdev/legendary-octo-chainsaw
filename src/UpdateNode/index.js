import React, { useEffect, useState } from "react";
import ReactFlow from "react-flow-renderer";

import "./updatenode.css";

const initialElements = [
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 340, y: 150 },
    type: "input",
  },
  { id: "2", data: { label: "Node 2" }, position: { x: 150, y: 300 } },
  { id: "3", data: { label: "Node 3" }, position: { x: 550, y: 300 } },
  {
    id: "4",
    data: { label: "Node 4" },
    position: { x: 550, y: 480 },
    type: "output",
  },
  {
    id: "e1-2",
    source: "provider-1",
    target: "provider-2",
    animated: false,
    type: "smoothstep",
  },
  {
    id: "e1-3",
    source: "provider-1",
    target: "provider-3",
    animated: false,
    type: "smoothstep",
  },
  {
    id: "e3-4",
    source: "provider-3",
    target: "provider-4",
    animated: true,
    type: "smoothstep",
  },
];

const UpdateNode = () => {
  const [elements, setElements] = useState(initialElements);
  const [nodeName, setNodeName] = useState("Node 1");
  const [nodeBg, setNodeBg] = useState("#eee");
  const [nodeHidden, setNodeHidden] = useState(false);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === "1") {
          // it's important that you create a new object here in order to notify react flow about the change
          el.data = {
            ...el.data,
            label: nodeName,
          };
        }

        return el;
      })
    );
  }, [nodeName, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === "1") {
          // it's important that you create a new object here in order to notify react flow about the change
          el.style = { ...el.style, backgroundColor: nodeBg };
        }

        return el;
      })
    );
  }, [nodeBg, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === "1" || el.id === "e1-2") {
          // when you update a simple type you can just update the value
          el.isHidden = nodeHidden;
        }

        return el;
      })
    );
  }, [nodeHidden, setElements]);

  return (
    <ReactFlow elements={elements} defaultZoom={1.5} minZoom={0.2} maxZoom={4}>
      <div className="updatenode__controls">
        <label>label:</label>
        <input
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
        />

        <label className="updatenode__bglabel">background:</label>
        <input value={nodeBg} onChange={(evt) => setNodeBg(evt.target.value)} />

        <div className="updatenode__checkboxwrapper">
          <label>hidden:</label>
          <input
            type="checkbox"
            checked={nodeHidden}
            onChange={(evt) => setNodeHidden(evt.target.checked)}
          />
        </div>
      </div>
    </ReactFlow>
  );
};

export default UpdateNode;
