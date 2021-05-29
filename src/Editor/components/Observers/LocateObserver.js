import React, { useCallback } from 'react';
import { useListener } from 'react-bus';
import { Easing, Tween, autoPlay } from 'es6-tween';

autoPlay(true);

const TRANSITION_TIME = 300;
const EASING = Easing.Quadratic.Out;

export default function LocateObserver(reactFlowInstance) {

  const handleTransform = useCallback(
    (transform, instanceObject) => {
      const {
        position: [x, y],
        zoom,
      } = instanceObject;

      new Tween({ x: x, y: y, zoom })
        .to(transform, TRANSITION_TIME)
        .easing(EASING)
        .on('update', ({ x, y, zoom }) => {
          console.log({ x, y, zoom });
          return window.reactFlowInstance.setTransform({ x, y, zoom })
        }
        )
        .start();
    },
    []
  );

  // Define locate event callback and listen to event bus
  const goLocation = React.useCallback(
    function ({ position, zoom }) {
      console.log(`goLocation event - position: ${position} zoom: ${zoom}`);
      //setCenter(position[0], position[1], zoom);
      handleTransform({ x: position[0], y: position[1], zoom: zoom }, window.reactFlowInstance.toObject())
    },
    [handleTransform]
  );

  useListener('goLocation', goLocation);

  return(<></>);
}
