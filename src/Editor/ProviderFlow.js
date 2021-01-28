import React, { useState, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, removeElements, Controls, Background, updateEdge } from 'react-flow-renderer';
import './provider.css';
import EditorToolbar from './EditorToolbar';
import AttributeToolbar from './AttributeToolbar';
import ShapeNode from './nodeTypes/ShapeNode';
import HandleNode from './nodeTypes/HandleNode';
import ScreenBlockNode from './nodeTypes/ScreenBlockNode';
import AnnotationNode from './nodeTypes/AnnotationNode';

// Yjs Imports
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

//Elements loaded on new doc
import initialElements from './initialElements';
import { useParams } from 'react-router-dom';

//Environment variables
const host = process.env.REACT_APP_YYHOST || 'localhost';
const port = process.env.REACT_APP_YYPORT || 5001;

//Custom node types go here
const nodeTypes = {
  ShapeNode,
  ScreenBlockNode,
  HandleNode,
  AnnotationNode,
};

const ProviderFlow = () => {
  // Get doc_id from router
  let { doc_id } = useParams();

  // Get yjs lib and create a reference to it
  const ydoc = React.useRef(null);
  const awareness = React.useRef(null);

  // Get a state array for React Flow's elements array.
  // We'll use this to update React Flow from Yjs
  const [elements, setElements] = React.useState([]);

  //Fires when React flow has loaded
  const reactFlowRef = React.useRef(null);
  const onLoad = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    reactFlowRef.current = reactFlowInstance;
  };

  React.useEffect(() => {
    ydoc.current = new Y.Doc({ guid: doc_id });
    console.log(`Loaded Y.Doc ID: ${doc_id}`, ydoc.current);

    const wsProvider = new WebsocketProvider(`ws://143.110.233.19/example`, doc_id, ydoc.current);

    const elementsYjs = ydoc.current.getArray('elements');

    wsProvider.on('sync', (isSynced) => {
      console.log(`wsProvider-- isSynced: ${isSynced}`)
      console.log('Listing elements', elementsYjs.toJSON());

      if (elementsYjs.toArray().length === 0) {
        console.log(`empty array-- loading initial elements`);
        initialElements.forEach((element, index) => {
          const node = new Y.Map();
          for (let [k, v] of Object.entries(element)) {
            node.set(k, v);
          }
          elementsYjs.insert(index, [node]);
        });
        console.log('Filled Array: ', elementsYjs.toJSON())
        setElements(elementsYjs.toJSON());
      } else {
        setElements(elementsYjs.toJSON());
      }
    });
    // Update state on changes to Yjs elements Array
    elementsYjs.observeDeep(() => {
      setElements(elementsYjs.toJSON());
    });
    // Set the elements array to empty while loading elements from server
    setElements([]);
  }, [doc_id]);

  const onNodeDrag = (event, node) => {
    // onDrag, update the yDoc with the node's current position
    for (const elmMap of ydoc.current.getArray('elements')) {
      if (elmMap.get('id') === node.id) {
        elmMap.set('position', reactFlowRef.current.project({ x: event.clientX, y: event.clientY }));
        break;
      }
    }
  };

  // Called when element deleted
  const onElementsRemove = (elementsToRemove) => {
    const elementsYjs = ydoc.current.getArray('elements');
    for (const elm of elementsToRemove) {
      for (const [i, elmMap] of ydoc.current.getArray('elements').toArray().entries()) {
        if (elmMap.get('id') === elm.id) {
          console.log(`Deleted node id: '${elm.id}' at elementsYjs[${i}]`)
         elementsYjs.delete(i, 1);
         break;
       }
     }
    }
    console.log(elementsToRemove)
  };

  // Called when new edge connected
  const onConnect = (params) => setElements((els) => addEdge({ type: 'smoothstep', ...params }, els));

  const onEdgeUpdate = (oldEdge, newConnection) => setElements((els) => updateEdge(oldEdge, newConnection, els));

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
        data: { ...customData, label: 'New node' },
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
    console.log('click', element);
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
            onEdgeUpdate={onEdgeUpdate}
            onLoad={onLoad}
            onNodeDrag={onNodeDrag}
            nodeTypes={nodeTypes}
            snapToGrid={true}
            snapGrid={[10, 10]}
            connectionMode="loose"
            connectionLineType="smoothstep"
            multiSelectionKeyCode="Control"
            deleteKeyCode="Delete"
          >
            <Controls />
            <AttributeToolbar setEls={setElements} />
            <EditorToolbar addNode={onAdd} />
            <Background variant="dots" gap="20" color="#484848" />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default ProviderFlow;
