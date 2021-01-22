import { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  useStoreState,
  useStoreActions,
  Background,
} from 'react-flow-renderer';
import './provider.css';
import EditorToolbar from "./EditorToolbar";

const onElementClick = (event, element) => console.log('click', element);
const onLoad = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const initialElements = [
  { id: 'provider-1', data: { label: 'Node 1' }, position: { x: 340, y: 150 }, type: 'input' },
  { id: 'provider-2', data: { label: 'Node 2' }, position: { x: 150, y: 300 } },
  { id: 'provider-3', data: { label: 'Node 3' }, position: { x: 550, y: 300 } },
  { id: 'provider-4', data: { label: 'Node 4' }, position: { x: 550, y: 480 }, type: 'output' },
  { id: 'provider-e1-2', source: 'provider-1', target: 'provider-2', animated: false },
  { id: 'provider-e1-3', source: 'provider-1', target: 'provider-3', animated: false },
  { id: 'provider-e3-4', source: 'provider-3', target: 'provider-4', animated: true },
];



const ProviderFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  
  const getNodeId = () => `randomnode_${+new Date()}`;
  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: 500,
        y: 500
      },
    };
    setElements((els) => els.concat(newNode));
  }, [setElements]);

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
          >
            <Controls />
            <EditorToolbar addNode={onAdd}/>
          </ReactFlow>

        </div>
      </ReactFlowProvider>
    </div>
  );
};
export default ProviderFlow;
