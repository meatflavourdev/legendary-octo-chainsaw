import React, { useEffect, useMemo, useCallback } from 'react';
import ReactFlow, { addEdge, Background, MiniMap, ReactFlowProvider } from 'react-flow-renderer';
import { useParams } from 'react-router-dom';
import EditorToolbar from './components/Toolbar/EditorToolbar';
import AttributeToolbar from './components/Toolbar/AttributeToolbar';
import ShapeNode from './nodeTypes/ShapeNode';
import HandleNode from './nodeTypes/HandleNode';
import ScreenBlockNode from './nodeTypes/ScreenBlockNode';
import AnnotationNode from './nodeTypes/AnnotationNode';
import CursorNode from './nodeTypes/CursorNode';
import useWindowDimensions from './hooks/getWindowDimensions';
import MouseObserver from './components/Observers/MouseObserver';
import useYArray from './hooks/useYArray';

import './style/provider.css';

// Yjs Imports
import * as Y from 'yjs';
import useHover from '@react-hook/hover';

//Elements loaded on new doc
//import initialElements from './data/initialElements';

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

const snapGrid = [5, 5];

const ProviderFlow = ({ yDoc, wsSync, setOpenDocs, awarenessRef }) => {
  // Get doc_id from router
  let { doc_id } = useParams();

  //Fires when React flow has loaded
  const reactFlowInstance = React.useRef(null);
  const onLoad = (_reactFlowInstance) => {
    reactFlowInstance.current = _reactFlowInstance;
  };

  // Selected Elements
  //const selectedElements = useStoreState((state) => state.selectedElements);

  //const [elements, setElements] = React.useState([]);
  const [elements, setElements] = useYArray(yDoc.current, 'elements');

  // Cursor Element Add/Update/Remove based on rfPosition ---------------

  /*   React.useEffect(() => {
    if (wsSync) {
      // Set elements array on YDoc synced & ready
      const elementsYjs = yDoc.current.getArray('elements');
      setElements(elementsYjs.toJSON());

      // Observe elementsYjs & Update state on change
      elementsYjs.observeDeep((event) => {
        setElements((prevState) => elementsYjs.toJSON());
        // TODO: Observe granular Yjs state changes and update only what has changed maintainging immutable reference data structures
        // NOTE: Should these bi-directional updated be done inside an Node component wrapper?

        const changeDelta = event.changes.delta;
        const index = changeDelta[0].retain + 1;
        const op = Object.keys(changeDelta[1]);
        const node = Object.values(changeDelta[1])[0];
        console.log(`Observed change -- index: ${index} op: ${op} node: `, node);

      });
    }
  }, [doc_id, yDoc, wsSync, setElements]); */

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
    const newEdges = addEdge({ type: 'smoothstep', selectable: true, ...params, arrowHeadType: 'arrowclosed' }, []);
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

  const parentRef = React.useRef(null);
  const isHovering = useHover(parentRef);

  return (
    <ReactFlowProvider>
      <div ref={parentRef} className="reactflow-wrapper">
        <ReactFlow
          elements={elements}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          onEdgeUpdate={onEdgeUpdate}
          onLoad={onLoad}
          onPaneClick={() => setOpenDocs(false)}
          nodeTypes={nodeTypes}
          snapToGrid={true}
          snapGrid={snapGrid}
          connectionMode="loose"
          connectionLineType="smoothstep"
          multiSelectionKeyCode="Control"
          arrowHeadColor="#595A66"
        >
          <MouseObserver
            parentRef={parentRef}
            yDoc={yDoc}
            reactFlowInstance={reactFlowInstance}
            isHovering={isHovering}
            awarenessRef={awarenessRef}
          />
          <AttributeToolbar yDoc={yDoc} reactFlowRef={reactFlowInstance} />
          <EditorToolbar addNode={onAdd} />
          <Background variant="dots" gap="20" color="#484848" />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default ProviderFlow;
