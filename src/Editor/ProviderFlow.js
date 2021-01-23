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
  { id: 'provider-1', data: { label: 'Node 1' }, position: { x: 345, y: 150 }, type: 'input' },
  { id: 'provider-2', data: { label: 'Node 2' }, position: { x: 150, y: 300 } },
  { id: 'provider-3', data: { label: 'Node 3' }, position: { x: 555, y: 300 } },
  { id: 'provider-4', data: { label: 'Node 4' }, position: { x: 555, y: 480 }, type: 'output' },
  { id: 'provider-e1-2', source: 'provider-1', target: 'provider-2', animated: false },
  { id: 'provider-e1-3', source: 'provider-1', target: 'provider-3', animated: false },
  { id: 'provider-e3-4', source: 'provider-3', target: 'provider-4', animated: true },
];
const nodeTypes = {};

const nodeDefaultValues = {
  background: '#3b5360',
  color: '#FFF',
  border: '0px'
}
const nodeShapes = {
  block: {
    ...nodeDefaultValues,
    width: 100,
    padding: '20px',
    borderRadius: '5px',
  },
  terminator: {
    ...nodeDefaultValues,
    borderRadius: '30px',
    width: 120
  }
};

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
    length: valueRef.current.length,
    insertValue: (index, value) => valueRef.current.insert(index, [value]),
    pushValue: (value) => valueRef.current.push([value]),
    yarrayInterface: {
      insert: (index, content) => valueRef.currentinsert(index, content),
      push: (content) => valueRef.current.push(content),
      unshift:  (content) => valueRef.current.unshift(content),
      delete: (index, length) => valueRef.current.delete(index, length),
      get: (index) => valueRef.current.get(index),
      toArray: () => valueRef.current.toArray(),
      slice: (start, end) => valueRef.current.slice(start, end),
      toJSON: () => valueRef.current.toJSON(),
      map: (f) => valueRef.current.map(f),
      forEach: (f) => valueRef.current.forEach(f),
    },
  };
};

const ProviderFlow = () => {
  const { doc_id } = useParams();
  const { value, pushValue, yarrayInterface } = useCollaborativeArray(doc_id);

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

  const onConnect = (params) => pushValue(addEdge(params, [])[0]);
  const onElementsRemove = (elementsToRemove) => {
      const nodeIdsToRemove = elementsToRemove.map((n) => n.id);
      for (const id of nodeIdsToRemove) {
        const currentArray = yarrayInterface.toArray();
        const deleteIndex = currentArray.findIndex((current) => current.id === id)
        yarrayInterface.delete(deleteIndex, 1);
      }
  };

  const getNodeId = () => `randomnode_${+new Date()}`;
  const onAdd = (type, shape) => {
    const newNode = {
      type,
      id: getNodeId(),
      style: nodeShapes[shape],
      data: { label: 'Added node' },
      position: {
        x: 500,
        y: 500
      },
    };
    pushValue(newNode);
  }

  const onNodeDragStart = (e, node) => {
    console.log('Drag Start', node)
  };
  const onNodeDragStop = (e, node) => {
    console.log('Drag Stop', node)
  };

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
            onNodeDragStart={onNodeDragStart}
            onNodeDragStop={onNodeDragStop}
            nodeTypes={nodeTypes}
            snapToGrid={true}
          >
            <Controls />
            <EditorToolbar addNode={onAdd} />
            <Background variant="dots" color="#484848" />
          </ReactFlow>

        </div>
      </ReactFlowProvider>
    </div>
  );
};
export default ProviderFlow;
