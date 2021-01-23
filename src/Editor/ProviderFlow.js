import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  useStoreState,
  useStoreActions,
  Background,
} from 'react-flow-renderer';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import './provider.css';
import EditorToolbar from "./EditorToolbar";
import { useParams } from "react-router-dom";

const doc = new Y.Doc();

const onElementClick = (event, element) => console.log('click', element);
const onLoad = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const initialElements = [
  { id: 'provider-1', data: { label: 'Node 1' }, position: { x: 340, y: 150 }, type: 'input' },
  { id: 'provider-2', data: { label: 'Node 2' }, position: { x: 150, y: 300 } },
  { id: 'provider-3', data: { label: 'Node 3' }, position: { x: 550, y: 300 } },
  { id: 'provider-4', data: { label: 'Node 4' }, position: { x: 550, y: 480 }, type: 'output' },
  { id: 'provider-e1-2', source: 'provider-1', target: 'provider-2', animated: false },
  { id: 'provider-e1-3', source: 'provider-1', target: 'provider-3', animated: false },
  { id: 'provider-e3-4', source: 'provider-3', target: 'provider-4', animated: true },
];

const useCollaborativeArray = (name) => {
  const valueRef = React.useRef(doc.getArray(name));
  console.log(`Loaded Document: ${name}`);
  const [state, setState] = React.useState([]);
  React.useEffect(() => {
    valueRef.current.observe((event) => {
      setState(valueRef.current.toArray());
    });
  }, []);
  return {
    value: state,
    insertValue: (i, v) => valueRef.current.insert(i, [v]),
    pushValue: (v) => valueRef.current.push([v]),
  };
};

const ProviderFlow = () => {
  const { doc_id } = useParams();
  const { value, insertValue, pushValue } = useCollaborativeArray(doc_id);

  React.useEffect(() => {
    const wsProvider = new WebsocketProvider('ws://localhost:5001', doc_id, doc);
    wsProvider.on('status', (event) => {
      console.log(event.status); // logs "connected" or "disconnected"
    });
    return () => wsProvider.destroy();
  }, []);

  React.useEffect(() => {
    console.log('yArray value:', value)
  }, [value]);

  const onConnect = (params) => console.log('onConnect Fired: ', params);
  const onElementsRemove = (elementsToRemove) => console.log('onConnect Fired: ', elementsToRemove);

  const getNodeId = () => `randomnode_${+new Date()}`;
  const onAdd = () => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: 500,
        y: 500
      },
    };
    pushValue(newNode)
  }

  return (
    <div className="providerflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <ReactFlow
            elements={value}
            onElementClick={onElementClick}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
          >
            <Controls />
            <EditorToolbar addNode={onAdd}/>
          </ReactFlow>

        </div>
      </ReactFlowProvider>
    </div>
  );
};
export default ProviderFlow;
