import React, { useEffect, useMemo, useCallback } from 'react';
import ReactFlow, { addEdge, Background, MiniMap } from 'react-flow-renderer';
import { useParams } from 'react-router-dom';
import EditorToolbar from './components/Toolbar/EditorToolbar';
import AttributeToolbar from './components/Toolbar/AttributeToolbar';
import ShapeNode from './nodeTypes/ShapeNode';
import HandleNode from './nodeTypes/HandleNode';
import ScreenBlockNode from './nodeTypes/ScreenBlockNode';
import AnnotationNode from './nodeTypes/AnnotationNode';
import CursorNode from './nodeTypes/CursorNode';
import useWindowDimensions from './hooks/getWindowDimensions';
import InfoDisplay from './components/Toolbar/InfoDisplay';
import useCursorPosition from './hooks/useCursorPosition';
import { useThrottleCallback } from '@react-hook/throttle';
import { useAuth } from '../contexts/AuthContext';
import usePrevious from '@react-hook/previous'
import './style/provider.css';

// Yjs Imports
import * as Y from 'yjs';

//Elements loaded on new doc
import initialElements from './data/initialElements';

// UUID generator
const uuid62 = require('uuid62');

//Custom node types go here
const nodeTypes = {
  ShapeNode,
  ScreenBlockNode,
  HandleNode,
  AnnotationNode,
  CursorNode,
};

const ProviderFlow = ({ yDoc, wsSync, setOpenDocs, awarenessState }) => {
  // Get doc_id from router
  let { doc_id } = useParams();

  //Fires when React flow has loaded
  const reactFlowInstance = React.useRef(null);
  const onLoad = (_reactFlowInstance) => {
    reactFlowInstance.current = _reactFlowInstance;
  };

  // Selected Elements
  //const selectedElements = useStoreState((state) => state.selectedElements);

  // Get a state array for React Flow's elements array.
  const [elements, setElements] = React.useState([]);

  // Cursor Element Add/Update/Remove based on rfPosition ---------------

  React.useEffect(() => {
    if (wsSync) {
      // Set elements array on YDoc synced & ready
      const elementsYjs = yDoc.current.getArray('elements');
      setElements(elementsYjs.toJSON());

      // Observe elementsYjs & Update state on change
      elementsYjs.observeDeep((e) => {
        setElements(elementsYjs.toJSON());
      });
    }
  }, [doc_id, yDoc, wsSync, setElements]);


  // Cursor Element Add/Update/Remove based on rfPosition ---------------

  const rfRef = React.useRef(null);
  const [mousePosition, rfPosition] = useCursorPosition(rfRef, reactFlowInstance);
  const { currentUser, clientID } = useAuth();
  const prevPosition = usePrevious(rfPosition);
  const prevTime = usePrevious(Date.now());
  useEffect(() => {
    const localCurrentUser = currentUser;

    const addCursorNode = (key, localCurrentUser, clientID, newPosition) => {
      const newNode = {
        id: key,
        key: key,
        type: 'CursorNode',
        data: {
          nodeKey: key,
          displayName: localCurrentUser.displayName,
          clientID: clientID,
          collabColor: localCurrentUser.collabColor,
        },
        selectable: false,
        draggable: false,
        connectable: false,
        position: { x: newPosition.x, y: newPosition.y },
      };
      const yNode = new Y.Map();
      for (let [k, v] of Object.entries(newNode)) {
        yNode.set(k, v);
      }
      yElements.push([yNode]);
    };

    const updateCursorPosition = (index, newPosition) => {
      const updateNode = yDoc.current.getArray('elements').get(index);
      updateNode && updateNode.set && updateNode.set('position', { x: newPosition.x, y: newPosition.y });
    };

    const deleteCursorNode = (key, yElements) => {
      if (key && yElements) {
        const elmIndex = yElements.toJSON().findIndex((elm) => elm.id === key);
        return yElements.toArray().length > 0 && yElements.delete(elmIndex, 1);
      }
      return console.error('ProviderFlow.useEffect().deleteElement(): key or yElements undefined', { key, yElements });
    };

    const key = `user-${localCurrentUser.uid}-${clientID}`;
    const yElements = yDoc.current && yDoc.current.getArray('elements');
    const localCursorNodeIndex = yDoc.current && yElements.toJSON().findIndex((elm) => elm.id === key);

    if (rfPosition?.x !== prevPosition?.x && rfPosition?.y !== prevPosition?.y) {
      if (reactFlowInstance.current && yDoc.current) {
        if (localCursorNodeIndex === -1) {
          if (rfPosition.x !== null && rfPosition.y !== null) {
            addCursorNode(key, localCurrentUser, clientID, rfPosition);
          }
        } else {
          if (rfPosition.x !== null || rfPosition.y !== null) {
            updateCursorPosition(localCursorNodeIndex, rfPosition);
          } else {
            deleteCursorNode(key, yElements);
          }
        }
      }
    }
  }, [prevPosition, rfPosition, currentUser, clientID, awarenessState, yDoc]);


  const onNodeDrag = (event, node) => {
    // onDrag, update the yDoc with the node's current position
/*     const selectedIds = [];
    for (const elm of selectedElements) {
      selectedIds.push(elm.id);
    }  */
    for (const elmMap of yDoc.current.getArray('elements')) {
      //if (selectedIds.includes(elmMap.get('id'))) {
      //console.log(`Element:`, elmMap.toJSON());
      if (elmMap?.get && elmMap.get('id') === node.id) {
        elmMap.set('position', node.position);
      }
    }
  };

  // Called when element deleted
  const onElementsRemove = (elementsToRemove) => {
    const elementsYjs = yDoc.current.getArray('elements');
    for (const elm of elementsToRemove) {
      for (const [i, elmMap] of yDoc.current.getArray('elements').toArray().entries()) {
        //console.log(`elm type: ${typeof (elmMap)} value: `, elmMap);
        if (elmMap.get('id') === elm.id) {
          console.log(`Deleted node id: '${elm.id}' at elementsYjs[${i}]`);
          elementsYjs.delete(i, 1);
          break;
        }
      }
    }
  };

  // Called when new edge connected
  const onConnect = (params) => {
    const newEdges = addEdge({ type: 'smoothstep', ...params, arrowHeadType: 'arrowclosed' }, []);
    const yEdge = new Y.Map();
    for (let [k, v] of Object.entries(newEdges[0])) {
      yEdge.set(k, v);
    }
    console.log(`Attempting to add edge: `, newEdges[0]);
    //yEdge.set('id', newEdgeId);
    yDoc.current.getArray('elements').push([yEdge]);
  };

  const onEdgeUpdate = (oldEdge, newConnection) => {
    onElementsRemove([oldEdge]);
    onConnect(newConnection);
  };

  //CREATES NEW ELEMENTS
  const { height, width } = useWindowDimensions();
  const onAdd = (type, customData) => {
    const nodePosition = reactFlowInstance.current.project({
      x: width / 2,
      y: height * 0.75,
    });
    const nodeKey = `node_${uuid62.v4()}`;
    const newNode = {
      id: nodeKey,
      key: nodeKey,
      type,
      data: { nodeKey: nodeKey, label: 'Node', ...customData },
      position: { x: nodePosition.x, y: nodePosition.y },
    };
    const yNode = new Y.Map();
    for (let [k, v] of Object.entries(newNode)) {
      yNode.set(k, v);
    }
    yDoc.current.getArray('elements').push([yNode]);
  };

  return (
    <div ref={rfRef} className="reactflow-wrapper">
      <ReactFlow
        elements={elements}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        onEdgeUpdate={onEdgeUpdate}
        onLoad={onLoad}
        onPaneClick={() => setOpenDocs(false)}
        onNodeDrag={onNodeDrag}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={[5, 5]}
        connectionMode="loose"
        connectionLineType="smoothstep"
        multiSelectionKeyCode="Control"
        arrowHeadColor="#595A66"
      >
        <AttributeToolbar yDoc={yDoc} reactFlowRef={reactFlowInstance} />
        <EditorToolbar addNode={onAdd} />
        <InfoDisplay mousePosition={mousePosition} rfPosition={rfPosition} />
        <Background variant="dots" gap="20" color="#484848" />
      </ReactFlow>
    </div>
  );
};

export default ProviderFlow;
