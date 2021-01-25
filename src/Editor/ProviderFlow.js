import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  useStoreState,
  useStoreActions,
  Background,
} from "react-flow-renderer";
import "./provider.css";
import EditorToolbar from "./EditorToolbar";
import AttributeToolbar from "./AttributeToolbar";
import ShapeNode from "./nodeTypes/ShapeNode";
import "../UpdateNode/updatenode.css";

const onLoad = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const initialElements = [
  {
    id: "provider-1",
    data: { label: "Node 1" },
    position: { x: 340, y: 150 },
    type: "ShapeNode",
  },
  {
    id: "provider-2",
    data: { label: "Node 2", fillStyle: "outlined", fillColor: "dark" },
    position: { x: 150, y: 300 },
    type: "default",
  },
  {
    id: "provider-3",
    data: { label: "Node 3", fillStyle: "dashed", fillColor: "light" },
    position: { x: 550, y: 300 },
    type: "ShapeNode",
  },
  {
    id: "provider-4",
    data: { label: "Node 4", fillStyle: "filled", fillColor: "red" },
    position: { x: 550, y: 480 },
    type: "ShapeNode",
  },
  // { id: 'provider-e1-2', source: 'provider-1', target: 'provider-2', animated: false, type: 'smoothstep' },
  // { id: 'provider-e1-3', source: 'provider-1', target: 'provider-3', animated: false, type: 'smoothstep' },
  {
    id: "provider-e3-4",
    source: "provider-3",
    target: "provider-4",
    animated: true,
    type: "smoothstep",
  },
];
const nodeTypes = {
  ShapeNode,
};

const nodeDefaultValues = {
  background: "#2D3A49",
  color: "#FFF",
  border: "0px",
};

const block = {
  ...nodeDefaultValues,
  width: 100,
  padding: "20px",
  borderRadius: "5px",
};
const nodeShapes = {
  block,
  terminator: {
    ...nodeDefaultValues,
    borderRadius: "30px",
    width: 120,
  },
  screenblock: {
    ...block,
    backgroundImage: "url(/screenblocks/page-01.svg)",
  },
  screenblock2: {
    ...block,
    backgroundImage: "url(/screenblocks/page-02.svg)",
  },
};

const ProviderFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const [nodeName, setNodeName] = useState("TEST");
  const [nodeBg, setNodeBg] = useState("#eee");
  const [nodeHidden, setNodeHidden] = useState(false);
  const [nodeid, setNodeid] = useState("");

  const onConnect = (params) =>
    setElements((els) => addEdge({ type: "smoothstep", ...params }, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const getNodeId = () => `randomnode_${+new Date()}`;
  const onAdd = useCallback(
    (type, shape) => {
      const newNode = {
        type,
        id: getNodeId(),
        style: nodeShapes[shape],
        data: { label: "Added node" },
        position: {
          x: 300,
          y: 300,
        },
      };

      setElements((els) => els.concat(newNode));
    },
    [setElements]
  );

  const [color, setFillColor] = useState("#eee");
  const [fillStyle, setFillStyle] = useState("filled");

  const onElementClick = (event, element) => {
    setNodeid(element.id);
    console.log("click", element);
  };

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === "provider-1") {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          el.data = {
            ...el.data,
            fillColor: color,
          };
          setNodeid("");
        }
        return el;
      })
    );
  }, [color, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === nodeid) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          el.data = {
            ...el.data,
            fillStyle,
          };
          setNodeid("");
        }
        return el;
      })
    );
  }, [fillStyle, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === nodeid) {
          // it's important that you create a new object here in order to notify react flow about the change
          el.data = {
            ...el.data,
            label: nodeName,
          };
        }

        return el;
      })
    );
  }, [nodeName, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === "provider-1") {
          // it's important that you create a new object here in order to notify react flow about the change
          el.style = { ...el.style, backgroundColor: nodeBg };
        }

        return el;
      })
    );
  }, [nodeBg, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === "provider-1" || el.id === "provider-e1-2") {
          // when you update a simple type you can just update the value
          el.isHidden = nodeHidden;
        }

        return el;
      })
    );
  }, [nodeHidden, setElements]);

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
          >
            <Controls />
            <AttributeToolbar
              fillStyle={setFillStyle}
              fillColor={setFillColor}
            />
            <div className="updatenode__controls">
              <label>label:</label>
              <input
                value={nodeName}
                onChange={(evt) => setNodeName(evt.target.value)}
              />

              <label className="updatenode__bglabel">background:</label>
              <input
                value={nodeBg}
                onChange={(evt) => setNodeBg(evt.target.value)}
              />

              <div className="updatenode__checkboxwrapper">
                <label>hidden:</label>
                <input
                  type="checkbox"
                  checked={nodeHidden}
                  onChange={(evt) => setNodeHidden(evt.target.checked)}
                />
              </div>
            </div>
            <EditorToolbar addNode={onAdd} />
            <Background variant="dots" gap="20" color="#484848" />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default ProviderFlow;
