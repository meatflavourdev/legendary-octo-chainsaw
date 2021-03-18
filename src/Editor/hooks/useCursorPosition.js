import useMouse from '@react-hook/mouse-position';

const pointToRendererPoint = ({ x, y }, [tx, ty, tScale]) => {
  const position = {
    x: (x - tx) / tScale,
    y: (y - ty) / tScale,
  };
  return position;
};

const useCursorPosition = function (ref, reactFlowInstance) {
  const mousePosition = useMouse(ref, {});
  let transform = null;
  if (mousePosition.x && reactFlowInstance && reactFlowInstance.current) {
    const reactFlowObject = reactFlowInstance.current.transform;
    transform = [ reactFlowInstance.current.toObject().position[0], reactFlowInstance.current.toObject().position[1], reactFlowInstance.current.toObject().zoom ];
  }
    const rfPosition = transform && pointToRendererPoint(mousePosition, transform) || {x: null, y: null};

  return [mousePosition, rfPosition];
};

export default useCursorPosition;
