import useMouse from '@react-hook/mouse-position';

const projectWithoutSnap = ({ x, y }, [tx, ty, tScale]) => {
  const position = {
    x: (x - tx) / tScale,
    y: (y - ty) / tScale,
  };
  return position;
};

const useCursorPosition = function (ref, reactFlowInstance) {
  const mousePosition = useMouse(ref, {});
  const transform =
    mousePosition && reactFlowInstance && reactFlowInstance.current
      ? [
          reactFlowInstance.current.toObject().position[0],
          reactFlowInstance.current.toObject().position[1],
          reactFlowInstance.current.toObject().zoom,
        ]
      : null;
  const rfPosition = (transform && projectWithoutSnap(mousePosition, transform)) || { x: null, y: null };

  return [mousePosition, rfPosition];
};

export default useCursorPosition;
