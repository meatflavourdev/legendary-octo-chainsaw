import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls,
  Background,
} from 'react-flow-renderer';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import './provider.css';
import EditorToolbar from "./EditorToolbar";
import { useParams } from "react-router-dom";
import EditNodes from './EditNodes';
import AttributeToolbar from './AttributeToolbar';

const doc = new Y.Doc();

const onElementClick = (event, element) => console.log('click', element);
const onLoad = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const nodeTypes = {};

const nodeDefaultValues = {
  background: '#2D3A49',
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
  const { value, insertValue, pushValue, yarrayInterface } = useCollaborativeArray(doc_id);

  React.useEffect(() => {
    const wsProvider = new WebsocketProvider('ws://localhost:5001', doc_id, doc);
    wsProvider.on('status', (event) => {
      console.log(event.status); // logs "connected" or "disconnected"
    });
    return () => wsProvider.destroy();
  }, []);

  const onConnect = (params) => pushValue(addEdge({type: 'smoothstep', ...params}, [])[0]);
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
        x: 300,
        y: 300
      },
    };
    pushValue(newNode);
  }

  const onSelectionDrag = (event, nodes) => {
    console.log('event: ', event);
    console.log('nodes: ', nodes);
  };

  let observerList = {};

  const onNodeDragStart = (e, node) => {
    //console.log('Drag Start -- observerList:', observerList)
    const observer = new MutationObserver((mutationsList, observer) => {
      const node_id = node.id;
      for(const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const currentArray = yarrayInterface.toArray();
          const nodeIndex = currentArray.findIndex((current) => current.id === node_id)
          const _posArr = mutation.target.style.transform.split(',');
          const posx = parseFloat(_posArr[0].match(/[\d\.]+/))
          const posy = parseFloat(_posArr[1].match(/[\d\.]+/))
          const oldNode = yarrayInterface.get(nodeIndex);
          oldNode.position = {
            x: posx,
            y: posy,
          }
          doc.transact(() => {
            yarrayInterface.delete(nodeIndex, 1);
            insertValue(nodeIndex, oldNode);
            console.log('I just updated the Y.Array');
          });
        }
    }
    });
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(e.currentTarget, config);
    observerList[node.id] = observer;
  };

  const onNodeDragStop = (e, node) => {
    observerList[node.id] && observerList[node.id].disconnect();
    delete observerList[node.id];
    //console.log('Drag Stop -- observerList:', observerList)
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
            onSelectionDrag={onSelectionDrag}
            snapGrid={[10, 10]}
          >
            <Controls />
            <AttributeToolbar/>
            <EditorToolbar addNode={onAdd} />
            <Background variant="dots" gap='20' color="#484848" />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default ProviderFlow;
