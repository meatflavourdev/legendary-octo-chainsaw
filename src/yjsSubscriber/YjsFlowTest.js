import React from "react";
import ReactFlow, {
  addEdge,
  removeElements,
  Controls,
  Background,
  MiniMap,
} from "react-flow-renderer";
import initialElements from "../Editor/initialElements";
import "./provider.css";

// Yjs Imports
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

export default function YjsFlowTest() {
  //Fires when React flow has loaded
  const reactFlowRef = React.useRef(null);
  const onLoad = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance)
    reactFlowRef.current = reactFlowInstance;
  };

  const ydoc = React.useRef(null);
  const [elements, setElements] = React.useState([]);
  const nodeDraggingRef = React.useRef(null);
  const onDragRef = React.useRef((event) =>
    ydoc.current
      .getMap('node-' + nodeDraggingRef.current)
      .set('position', reactFlowRef.current.project({ x: event.clientX, y: event.clientY }))
  );
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  React.useEffect(() => {
    ydoc.current = new Y.Doc();
    new WebsocketProvider('ws://143.110.233.19/example', 'collab', ydoc.current);
    const nodes = ydoc.current.getArray('all-nodes');
    if (nodes.toArray().length === 0) {
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
        nodes.insert(index, [element]);
      });
      nodes.observe((event, transaction) => {});
      setElements(nodes.toArray());
    }
  }, []);
  const onNodeDragStart = (event, node) => {
    nodeDraggingRef.current = node.id;
    document.addEventListener('mousemove', onDragRef.current);
  };
  const onNodeDragStop = (event, node) => {
    nodeDraggingRef.current = node.id;
    document.removeEventListener('mousemove', onDragRef.current);
  };

  return (
    <div className="container">
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={onLoad}
        onNodeDragStart={onNodeDragStart}
        onNodeDragStop={onNodeDragStop}
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'output') return '#ff0072';
            if (n.type === 'default') return '#1a192b';
            return '#eee';
          }}
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;
            return '#fff';
          }}
          nodeBorderRadius={2}
        />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}
