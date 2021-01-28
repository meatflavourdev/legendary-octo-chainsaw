import React, { useState, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, removeElements, Controls, Background } from 'react-flow-renderer';
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

const ProviderFlow = ({ydoc}) => {
  // Get doc_id from router
  let { doc_id } = useParams();

  // Get yjs lib and create a reference to it
  const ydoc = React.useRef(null);

  // Get a state array for React Flow's elements array.
  // We'll use this to update React Flow from Yjs
  const [elements, setElements] = React.useState([]);

  // A Reference to the currently dragging node ID
  const nodeDraggingRef = React.useRef(null);
  // A Reference to the currently dragging React Flow node's drag listener
  const onDragRef = React.useRef((event) =>
    // onDrag, update the yDoc with the node's current pixel space coords projected into project coords
    ydoc.current
      .getMap('node-' + nodeDraggingRef.current)
      .set('position', reactFlowRef.current.project({ x: event.clientX, y: event.clientY }))
  );

  //Fires when React flow has loaded
  const reactFlowRef = React.useRef(null);
  const onLoad = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    reactFlowRef.current = reactFlowInstance;
  };

  React.useEffect(() => {
    ydoc.current = new Y.Doc({ guid: doc_id });
    console.log(`Loaded Y.Doc ID: ${doc_id}`, ydoc.current);

    new WebsocketProvider(`ws://143.110.233.19/example`, doc_id, ydoc.current);

    const elementsYjs = ydoc.current.getArray('elements');

    if (elementsYjs.toArray().length === 0) {
      initialElements.forEach((element, index) => {
        const node = ydoc.current.getMap('node-' + element.id);
        for (let [k, v] of Object.entries(element)) {
          node.set(k, v);
          node.observe((event, transaction) => {
            if (event.keysChanged.has('position')) {
              setElements((elements) =>
                elements.map((element) => {
                  if (element.id === event.currentTarget.get('id')) {
                    return {
                      ...element,
                      position: event.currentTarget.get('position'),
                    };
                  }
                  return element;
                })
              );
            }
          });
        }
        elementsYjs.insert(index, [element]);
      });

      elementsYjs.observe((event, transaction) => {});
      setElements(elementsYjs.toArray());
    }
  }, [doc_id]);

  const onNodeDrag = (event, node) => {
    // onDrag, update the yDoc with the node's current position
    ydoc.current.getMap('node-' + node.id).set('position', { x: node.position.x, y: node.position.y });
  };

  // Called when element deleted
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));

  // Called when new edge connected
  const onConnect = (params) => setElements((els) => addEdge({ type: 'smoothstep', ...params }, els));

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
            onLoad={onLoad}
            onNodeDrag={onNodeDrag}
            nodeTypes={nodeTypes}
            snapToGrid={true}
            snapGrid={[10, 10]}
            connectionMode="loose"
            connectionLineType="smoothstep"
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
