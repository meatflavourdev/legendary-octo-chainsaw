import useMouse from '@react-hook/mouse-position';

const useCursorPosition = function (ref, reactFlowInstance) {

  const mousePosition = useMouse(ref, {});
  let rfPosition = {
    x: null,
    y: null,
  };
  if (mousePosition.x && reactFlowInstance && reactFlowInstance.current) {
    rfPosition = reactFlowInstance.current.project({ x: mousePosition.x, y: mousePosition.y });
  }

  return [mousePosition, rfPosition];
}

export default useCursorPosition;
