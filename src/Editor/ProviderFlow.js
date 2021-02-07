import React from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
} from "react-flow-renderer";
import { useParams } from "react-router-dom";
import EditorToolbar from "./components/EditorToolbar";
import AttributeToolbar from "./components/AttributeToolbar";
import ShapeNode from "./nodeTypes/ShapeNode";
import HandleNode from "./nodeTypes/HandleNode";
import ScreenBlockNode from "./nodeTypes/ScreenBlockNode";
import AnnotationNode from "./nodeTypes/AnnotationNode";
import useWindowDimensions from "./hooks/getWindowDimensions";
import "./style/provider.css";

// Yjs Imports
import * as Y from "yjs";

//Elements loaded on new doc
import initialElements from "./data/initialElements";

// UUID generator
const uuid62 = require("uuid62");

//Custom node types go here
const nodeTypes = {
  ShapeNode,
  ScreenBlockNode,
  HandleNode,
  AnnotationNode,
};

const ProviderFlow = ({yDoc, wsSync, setOpenDocs}) => {
  // Get doc_id from router
  let { doc_id } = useParams();

  //Window Dimensions hook
  const { height, width } = useWindowDimensions();

  // Get a state array for React Flow's elements array.
  // We'll use this to update React Flow from Yjs
  const [elements, setElements] = React.useState([]);

  // Close Doc Drawer
  const handleDocsDrawerClose = () => setOpenDocs(false);

  //Generates an ID for each new node
  const newNodeId = () => `node_${uuid62.v4()}`;

  //Fires when React flow has loaded
  const reactFlowRef = React.useRef(null);
  const onLoad = (reactFlowInstance) => {
    console.log("flow loaded:", reactFlowInstance);
    reactFlowRef.current = reactFlowInstance;
  };

  // Selected Elements
  //const selectedElements = useStoreState((state) => state.selectedElements);


  React.useEffect(() => {
    console.log('---------------- Provider Flow useEffect called  ----------------');


    if (wsSync) {
      console.log(`wsProvider isSynced: ${wsSync}`);
      const elementsYjs = yDoc.current.getArray("elements");

      if (elementsYjs.toArray().length === 0) {
        console.log(`empty array-- loading initial elements`);
        initialElements.forEach((element, index) => {
          const node = new Y.Map();
          for (let [k, v] of Object.entries(element)) {
            node.set(k, v);
          }
          node.set("key", element.id);
          elementsYjs.insert(index, [node]);
        });
        console.log("Filled Array: ", elementsYjs.toJSON());
        setElements(elementsYjs.toJSON());
      } else {
        setElements(elementsYjs.toJSON());
      }
      // Update state on changes to Yjs elements Array
      elementsYjs.observeDeep(() => {
        setElements(elementsYjs.toJSON());
      });
    };
    if (!wsSync) {
      // Set the elements array to empty while loading elements from server
      console.log(`wsProvider isSynced: ${wsSync}`);
      setElements([]);
    }
  }, [doc_id, yDoc, wsSync]);

  const onNodeDrag = (event, node) => {
    // onDrag, update the yDoc with the node's current position
    /*     const selectedIds = [];
    for (const elm of selectedElements) {
      selectedIds.push(elm.id);
    } */
    for (const elmMap of yDoc.current.getArray("elements")) {
      //if (selectedIds.includes(elmMap.get('id'))) {
      //console.log(`Element type: ${typeof elmMap}`);
      if (elmMap?.get("id") === node.id) {
        elmMap.set(
          "position",
          node.position
        );
      }
    }
  };

  // Called when element deleted
  const onElementsRemove = (elementsToRemove) => {
    const elementsYjs = yDoc.current.getArray("elements");
    for (const elm of elementsToRemove) {
      for (const [i, elmMap] of yDoc.current
        .getArray("elements")
        .toArray()
        .entries()) {
        //console.log(`elm type: ${typeof (elmMap)} value: `, elmMap);
        if (elmMap.get("id") === elm.id) {
          console.log(`Deleted node id: '${elm.id}' at elementsYjs[${i}]`);
          elementsYjs.delete(i, 1);
          break;
        }
      }
    }
    console.log(elementsToRemove);
  };

  // Called when new edge connected
  const onConnect = (params) => {
    const newEdges = addEdge(
      { type: "smoothstep", ...params, arrowHeadType: "arrowclosed" },
      []
    );
    const yEdge = new Y.Map();
    for (let [k, v] of Object.entries(newEdges[0])) {
      yEdge.set(k, v);
    }
    console.log(`Attempting to add edge: `, newEdges[0]);
    //yEdge.set('id', newEdgeId);
    yDoc.current.getArray("elements").push([yEdge]);
  };

  const onEdgeUpdate = (oldEdge, newConnection) => {
    onElementsRemove([oldEdge]);
    onConnect(newConnection);
  };

  //CREATES NEW ELEMENTS
  const onAdd = (type, customData) => {
    const nodePosition = reactFlowRef.current.project({
      x: width / 2,
      y: height * 0.75,
    });
    const newNode = {
      id: newNodeId(),
      key: newNodeId(),
      type,
      data: { ...customData, label: "New node" },
      position: nodePosition,
    };
    const yNode = new Y.Map();
    for (let [k, v] of Object.entries(newNode)) {
      yNode.set(k, v);
    }
    yDoc.current.getArray("elements").push([yNode]);
  };

  //Fires when an element is clicked
  const onElementClick = (event, element) => {
    console.log("click", element);
  };

  return (
        <div className="reactflow-wrapper">
          <ReactFlow
            elements={elements}
            onElementClick={onElementClick}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onEdgeUpdate={onEdgeUpdate}
            onLoad={onLoad}
            onPaneClick={handleDocsDrawerClose}
            onNodeDrag={onNodeDrag}
            nodeTypes={nodeTypes}
            snapToGrid={true}
            snapGrid={[5, 5]}
            connectionMode="loose"
            connectionLineType="smoothstep"
            multiSelectionKeyCode="Control"
          >
            <Controls />
            <AttributeToolbar ydoc={yDoc} reactFlowRef={reactFlowRef} />
            <EditorToolbar addNode={onAdd} />
            <Background variant="dots" gap="20" color="#484848" />
          </ReactFlow>
        </div>
  );
};

export default ProviderFlow;
