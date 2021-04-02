import useMouse from '@react-hook/mouse-position';
import useMousePosition from '../hooks/useMousePosition';

const projectWithoutSnap = ({ x, y }, [tx, ty, tScale]) => {
  const position = {
    x: (x - tx) / tScale,
    y: (y - ty) / tScale,
  };
  return position;
};

const useCursorPosition = function (ref, reactFlowInstance) {
  const mousePosition = useMousePosition();
  const transform =
    mousePosition && reactFlowInstance && reactFlowInstance.current
      ? [
          reactFlowInstance.current.toObject().position[0],
          reactFlowInstance.current.toObject().position[1],
          reactFlowInstance.current.toObject().zoom,
        ]
      : null;
  const rfPosition =
    transform && mousePosition.x !== null && mousePosition.y !== null
      ? projectWithoutSnap(mousePosition, transform)
      : { x: null, y: null };
  return [mousePosition, rfPosition];
};

export default useCursorPosition;
