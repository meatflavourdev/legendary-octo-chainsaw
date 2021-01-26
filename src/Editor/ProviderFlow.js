import { useState, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background,
} from "react-flow-renderer";
import "./provider.css";
import EditorToolbar from "./EditorToolbar";
import AttributeToolbar from "./AttributeToolbar";
import ShapeNode from "./nodeTypes/ShapeNode";
import ScreenBlockNode from "./nodeTypes/ScreenBlockNode";

//Fires when flowchart has loaded
const onLoad = (reactFlowInstance) => console.log("flow loaded:", reactFlowInstance);

//Elements loaded on startup
const initialElements = [
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 340, y: 150 },
    type: "ShapeNode",
  },
  {
    id: "provider-2",
    data: { label: "Node 2", fillStyle: "outlined", fillColor: "dark" },
    position: { x: 150, y: 300 },
    type: "ShapeNode",
  },
  {
    id: "provider-3",
    data: { label: "Node 3", fillStyle: "dashed", fillColor: "light" },
    position: { x: 550, y: 300 },
    type: "ShapeNode",
  },
  {
    id: "provider-4",
    data: { label: "Node 4ssssssssssssssssssssssssss", fillStyle: "filled", fillColor: "red" },
    position: { x: 550, y: 480 },
    type: "ShapeNode",
  },
  {
    id: "provider-e3-4",
    source: "provider-3",
    target: "provider-4",
    animated: true,
    type: "smoothstep",
  },
];

//Custom node types go here
const nodeTypes = {
  ShapeNode,
  ScreenBlockNode
};


const ProviderFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const [nodeName, setNodeName] = useState("Node 1");

  //Fires when you connect 2 handles
  const onConnect = (params) =>
    setElements((els) => addEdge({ type: "smoothstep", ...params }, els));

  //Fires when an element is deleted  
  const onElementsRemove = (elementsToRemove) =>
    setElements(
      (els) => removeElements(elementsToRemove, els),
      console.log("REMOVED NODE")
    );
  
  //Generates an ID for each new node
  const newNodeId = () => `randomnode_${+new Date()}`;
  
  //CREATES NEW ELEMENTS
  const onAdd = useCallback(
    (type, customData) => {
      let randomNumber = (Math.floor(Math.random() * (60 - 20 + 1)) + 20) * 10;
      const newNode = {
        type,
        id: newNodeId(),
        type,
        data: { ...customData, label: "New node" },
        position: {
          x: 300,
          y: 300,
        },
      };

      setElements((els) => els.concat(newNode));
    },
    [setElements]
  );
  
  //Fires when an element is clicked
  const onElementClick = (event, element) => {
    console.log("click", element);
  };

  return (
    <div className="providerflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <ReactFlow
            elements={elements}
            onElementClick={onElementClick}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            nodeTypes={nodeTypes}
            snapToGrid={true}
            snapGrid={[10, 10]}
            connectionMode="loose"
            connectionLineType="smoothstep"
          >
            <Controls />
            <AttributeToolbar
              setEls={setElements}
            />
            <EditorToolbar addNode={onAdd} />
            <Background variant="dots" gap="20" color="#484848" />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default ProviderFlow;
