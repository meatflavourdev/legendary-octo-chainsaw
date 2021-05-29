import React from 'react';
import { useZoomPanHelper } from 'react-flow-renderer';
import { useListener } from 'react-bus';

export default function LocateObserver() {
  const { setCenter } = useZoomPanHelper();

  // Define locate event callback and listen to event bus
  const goLocation = React.useCallback(
    function ({ position, zoom }) {
      console.log(`goLocation event - position: ${position} zoom: ${zoom}`);
      setCenter(position[0], position[1], zoom);
    },
    [setCenter]
  );

  useListener('goLocation', goLocation);

  return(<></>);
}
