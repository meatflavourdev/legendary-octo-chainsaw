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
    id: "1",
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
  width: 79,
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
  screenblock1: {
    ...block,
    backgroundImage: "url(/screenblocks/page-01.svg)",
  },
  screenblock2: {
    ...block,
    backgroundImage: "url(/screenblocks/page-02.svg)",
  },
  screenblock3: {
    ...block,
    backgroundImage: "url(/screenblocks/page-03.svg)",
  },
  screenblock4: {
    ...block,
    backgroundImage: "url(/screenblocks/page-04.svg)",
  },
  screenblock5: {
    ...block,
    backgroundImage: "url(/screenblocks/page-05.svg)",
  },
  screenblock6: {
    ...block,
    backgroundImage: "url(/screenblocks/page-06.svg)",
  },
  screenblock7: {
    ...block,
    backgroundImage: "url(/screenblocks/page-07.svg)",
  },
  screenblock8: {
    ...block,
    backgroundImage: "url(/screenblocks/page-08.svg)",
  },
  screenblock9: {
    ...block,
    backgroundImage: "url(/screenblocks/page-09.svg)",
  },
  screenblock10: {
    ...block,
    backgroundImage: "url(/screenblocks/page-10.svg)",
  },
  screenblock11: {
    ...block,
    backgroundImage: "url(/screenblocks/page-11.svg)",
  },
  screenblock12: {
    ...block,
    backgroundImage: "url(/screenblocks/page-12.svg)",
  },
  screenblock13: {
    ...block,
    backgroundImage: "url(/screenblocks/page-13.svg)",
  },
  screenblock14: {
    ...block,
    backgroundImage: "url(/screenblocks/page-14.svg)",
  },
  screenblock15: {
    ...block,
    backgroundImage: "url(/screenblocks/page-15.svg)",
  },
  screenblock16: {
    ...block,
    backgroundImage: "url(/screenblocks/page-16.svg)",
  },
  screenblock17: {
    ...block,
    backgroundImage: "url(/screenblocks/page-17.svg)",
  },
  screenblock18: {
    ...block,
    backgroundImage: "url(/screenblocks/page-18.svg)",
  },
  screenblock19: {
    ...block,
    backgroundImage: "url(/screenblocks/page-19.svg)",
  },
  screenblock20: {
    ...block,
    backgroundImage: "url(/screenblocks/page-20.svg)",
  },
  screenblock21: {
    ...block,
    backgroundImage: "url(/screenblocks/page-21.svg)",
  },
  screenblock22: {
    ...block,
    backgroundImage: "url(/screenblocks/page-22.svg)",
  },
  screenblock23: {
    ...block,
    backgroundImage: "url(/screenblocks/page-23.svg)",
  },
  screenblock24: {
    ...block,
    backgroundImage: "url(/screenblocks/page-24.svg)",
  },
  screenblock25: {
    ...block,
    backgroundImage: "url(/screenblocks/page-25.svg)",
  },
  screenblock26: {
    ...block,
    backgroundImage: "url(/screenblocks/page-26.svg)",
  },
  screenblock27: {
    ...block,
    backgroundImage: "url(/screenblocks/page-27.svg)",
  },
  screenblock28: {
    ...block,
    backgroundImage: "url(/screenblocks/page-28.svg)",
  },
  screenblock29: {
    ...block,
    backgroundImage: "url(/screenblocks/page-29.svg)",
  },
  screenblock30: {
    ...block,
    backgroundImage: "url(/screenblocks/page-30.svg)",
  },
  screenblock31: {
    ...block,
    backgroundImage: "url(/screenblocks/page-31.svg)",
  },
  screenblock32: {
    ...block,
    backgroundImage: "url(/screenblocks/page-32.svg)",
  },
  screenblock33: {
    ...block,
    backgroundImage: "url(/screenblocks/page-33.svg)",
  },
  screenblock34: {
    ...block,
    backgroundImage: "url(/screenblocks/page-34.svg)",
  },
  screenblock35: {
    ...block,
    backgroundImage: "url(/screenblocks/page-35.svg)",
  },
  screenblock36: {
    ...block,
    backgroundImage: "url(/screenblocks/page-36.svg)",
  },
  screenblock37: {
    ...block,
    backgroundImage: "url(/screenblocks/page-37.svg)",
  },
  screenblock38: {
    ...block,
    backgroundImage: "url(/screenblocks/page-38.svg)",
  },
  screenblock39: {
    ...block,
    backgroundImage: "url(/screenblocks/page-39.svg)",
  },
  screenblock40: {
    ...block,
    backgroundImage: "url(/screenblocks/page-40.svg)",
  },
  screenblock41: {
    ...block,
    backgroundImage: "url(/screenblocks/page-41.svg)",
  },
  screenblock42: {
    ...block,
    backgroundImage: "url(/screenblocks/page-42.svg)",
  },
  screenblock43: {
    ...block,
    backgroundImage: "url(/screenblocks/page-43.svg)",
  },
  screenblock44: {
    ...block,
    backgroundImage: "url(/screenblocks/page-44.svg)",
  },
  screenblock45: {
    ...block,
    backgroundImage: "url(/screenblocks/page-45.svg)",
  },
  screenblock46: {
    ...block,
    backgroundImage: "url(/screenblocks/page-46.svg)",
  },
  screenblock47: {
    ...block,
    backgroundImage: "url(/screenblocks/page-47.svg)",
  },
  screenblock48: {
    ...block,
    backgroundImage: "url(/screenblocks/page-48.svg)",
  },
  screenblock49: {
    ...block,
    backgroundImage: "url(/screenblocks/page-49.svg)",
  },
  screenblock50: {
    ...block,
    backgroundImage: "url(/screenblocks/page-50.svg)",
  },
  screenblock51: {
    ...block,
    backgroundImage: "url(/screenblocks/page-51.svg)",
  },
  screenblock52: {
    ...block,
    backgroundImage: "url(/screenblocks/page-52.svg)",
  },
  screenblock53: {
    ...block,
    backgroundImage: "url(/screenblocks/page-53.svg)",
  },
  screenblock54: {
    ...block,
    backgroundImage: "url(/screenblocks/page-54.svg)",
  },
  screenblock55: {
    ...block,
    backgroundImage: "url(/screenblocks/page-55.svg)",
  },
  screenblock56: {
    ...block,
    backgroundImage: "url(/screenblocks/page-56.svg)",
  },
  screenblock57: {
    ...block,
    backgroundImage: "url(/screenblocks/page-57.svg)",
  },
  screenblock58: {
    ...block,
    backgroundImage: "url(/screenblocks/page-58.svg)",
  },
  screenblock59: {
    ...block,
    backgroundImage: "url(/screenblocks/page-59.svg)",
  },
  screenblock60: {
    ...block,
    backgroundImage: "url(/screenblocks/page-60.svg)",
  },
  screenblock61: {
    ...block,
    backgroundImage: "url(/screenblocks/page-61.svg)",
  },
  screenblock62: {
    ...block,
    backgroundImage: "url(/screenblocks/page-62.svg)",
  },
  screenblock63: {
    ...block,
    backgroundImage: "url(/screenblocks/page-63.svg)",
  },
  screenblock64: {
    ...block,
    backgroundImage: "url(/screenblocks/page-64.svg)",
  },
  screenblock65: {
    ...block,
    backgroundImage: "url(/screenblocks/page-65.svg)",
  },
  screenblock66: {
    ...block,
    backgroundImage: "url(/screenblocks/page-66.svg)",
  },
  screenblock67: {
    ...block,
    backgroundImage: "url(/screenblocks/page-67.svg)",
  },
  screenblock68: {
    ...block,
    backgroundImage: "url(/screenblocks/page-68.svg)",
  },
  screenblock69: {
    ...block,
    backgroundImage: "url(/screenblocks/page-69.svg)",
  },
  screenblock70: {
    ...block,
    backgroundImage: "url(/screenblocks/page-70.svg)",
  },
  screenblock71: {
    ...block,
    backgroundImage: "url(/screenblocks/page-71.svg)",
  },
  screenblock72: {
    ...block,
    backgroundImage: "url(/screenblocks/page-72.svg)",
  },
  screenblock73: {
    ...block,
    backgroundImage: "url(/screenblocks/page-73.svg)",
  },
  screenblock74: {
    ...block,
    backgroundImage: "url(/screenblocks/page-74.svg)",
  },
  screenblock75: {
    ...block,
    backgroundImage: "url(/screenblocks/page-75.svg)",
  },
  screenblock76: {
    ...block,
    backgroundImage: "url(/screenblocks/page-76.svg)",
  },
  screenblock77: {
    ...block,
    backgroundImage: "url(/screenblocks/page-77.svg)",
  },
  screenblock78: {
    ...block,
    backgroundImage: "url(/screenblocks/page-78.svg)",
  },
  screenblock79: {
    ...block,
    backgroundImage: "url(/screenblocks/page-79.svg)",
  },
  screenblock80: {
    ...block,
    backgroundImage: "url(/screenblocks/page-80.svg)",
  },
  screenblock81: {
    ...block,
    backgroundImage: "url(/screenblocks/page-81.svg)",
  },
  screenblock82: {
    ...block,
    backgroundImage: "url(/screenblocks/page-82.svg)",
  },
  screenblock83: {
    ...block,
    backgroundImage: "url(/screenblocks/page-83.svg)",
  },
  screenblock84: {
    ...block,
    backgroundImage: "url(/screenblocks/page-84.svg)",
  },
  screenblock85: {
    ...block,
    backgroundImage: "url(/screenblocks/page-85.svg)",
  },
  screenblock86: {
    ...block,
    backgroundImage: "url(/screenblocks/page-86.svg)",
  },
  screenblock87: {
    ...block,
    backgroundImage: "url(/screenblocks/page-87.svg)",
  },
  screenblock88: {
    ...block,
    backgroundImage: "url(/screenblocks/page-88.svg)",
  },
  screenblock89: {
    ...block,
    backgroundImage: "url(/screenblocks/page-89.svg)",
  },
  screenblock90: {
    ...block,
    backgroundImage: "url(/screenblocks/page-90.svg)",
  },
  screenblock91: {
    ...block,
    backgroundImage: "url(/screenblocks/page-91.svg)",
  },
  screenblock92: {
    ...block,
    backgroundImage: "url(/screenblocks/page-92.svg)",
  },
  screenblock93: {
    ...block,
    backgroundImage: "url(/screenblocks/page-93.svg)",
  },
  screenblock94: {
    ...block,
    backgroundImage: "url(/screenblocks/page-94.svg)",
  },
  screenblock95: {
    ...block,
    backgroundImage: "url(/screenblocks/page-95.svg)",
  },
  screenblock96: {
    ...block,
    backgroundImage: "url(/screenblocks/page-96.svg)",
  },
  screenblock97: {
    ...block,
    backgroundImage: "url(/screenblocks/page-97.svg)",
  },
  screenblock98: {
    ...block,
    backgroundImage: "url(/screenblocks/page-98.svg)",
  },
  screenblock99: {
    ...block,
    backgroundImage: "url(/screenblocks/page-99.svg)",
  },
  screenblock100: {
    ...block,
    backgroundImage: "url(/screenblocks/page-100.svg)",
  },
  screenblock101: {
    ...block,
    backgroundImage: "url(/screenblocks/page-101.svg)",
  },
  screenblock102: {
    ...block,
    backgroundImage: "url(/screenblocks/page-102.svg)",
  },
  screenblock103: {
    ...block,
    backgroundImage: "url(/screenblocks/page-103.svg)",
  },
  screenblock104: {
    ...block,
    backgroundImage: "url(/screenblocks/page-104.svg)",
  },
  screenblock105: {
    ...block,
    backgroundImage: "url(/screenblocks/page-105.svg)",
  },
  screenblock106: {
    ...block,
    backgroundImage: "url(/screenblocks/page-106.svg)",
  },
  screenblock107: {
    ...block,
    backgroundImage: "url(/screenblocks/page-107.svg)",
  },
  screenblock108: {
    ...block,
    backgroundImage: "url(/screenblocks/page-108.svg)",
  },
  screenblock109: {
    ...block,
    backgroundImage: "url(/screenblocks/page-109.svg)",
  },
  screenblock110: {
    ...block,
    backgroundImage: "url(/screenblocks/page-110.svg)",
  },
  screenblock111: {
    ...block,
    backgroundImage: "url(/screenblocks/page-111.svg)",
  },
  screenblock112: {
    ...block,
    backgroundImage: "url(/screenblocks/page-112.svg)",
  },
  screenblock113: {
    ...block,
    backgroundImage: "url(/screenblocks/page-113.svg)",
  },
  screenblock114: {
    ...block,
    backgroundImage: "url(/screenblocks/page-114.svg)",
  },
  screenblock115: {
    ...block,
    backgroundImage: "url(/screenblocks/page-115.svg)",
  },
  screenblock116: {
    ...block,
    backgroundImage: "url(/screenblocks/page-116.svg)",
  },
  screenblock117: {
    ...block,
    backgroundImage: "url(/screenblocks/page-117.svg)",
  },
  screenblock118: {
    ...block,
    backgroundImage: "url(/screenblocks/page-118.svg)",
  },
  screenblock119: {
    ...block,
    backgroundImage: "url(/screenblocks/page-119.svg)",
  },
  screenblock120: {
    ...block,
    backgroundImage: "url(/screenblocks/page-120.svg)",
  },
  checkcircle: {
    ...block,
    backgroundImage: "url(/annotations/check-circle.svg)",
  },
  timescircle: {
    ...block,
    backgroundImage: "url(/annotations/times-circle.svg)",
  },
  infocircle: {
    ...block,
    backgroundImage: "url(/annotations/info-circle.svg)",
  },
  questioncircle: {
    ...block,
    backgroundImage: "url(/annotations/question-circle.svg)",
  },
};

const ProviderFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const [nodeName, setNodeName] = useState("Node 1");
  const [nodeBg, setNodeBg] = useState("#eee");
  const [nodeHidden, setNodeHidden] = useState(false);
  const [nodeid, setNodeid] = useState("");
  const [color, setFillColor] = useState("#eee");
  const [fillStyle, setFillStyle] = useState("filled");

  const onConnect = (params) =>
    setElements((els) => addEdge({ type: "smoothstep", ...params }, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements(
      (els) => removeElements(elementsToRemove, els),
      console.log("REMOVED NODE")
    );

  const getNodeId = () => `randomnode_${+new Date()}`;
  const onAdd = useCallback(
    (type, shape) => {
      let randomNumber = (Math.floor(Math.random() * (60 - 20 + 1)) + 20) * 10;
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

  const onElementClick = (event, element) => {
    setNodeid(element.id);
    console.log("click", element);
  };

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === nodeid) {
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
