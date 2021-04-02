import React, { useEffect, useMemo, useCallback } from 'react';
import useCursorPosition from '../../hooks/useCursorPosition';
import { useAuth } from '../../../contexts/AuthContext';
import usePrevious from '@react-hook/previous';
import useEvent from '@react-hook/event';
import { getColor } from '../../../helpers/goldenColorHash';
import InfoDisplay from './../../components/Toolbar/InfoDisplay';
import { makeStyles } from '@material-ui/core/styles';
import * as Y from 'yjs';

const useStyles = makeStyles((theme) => ({
  rfCanvasRect: {
    width: '100vw',
    height: '100%',
  },
}));


export default function MouseObserver({ parentRef, yDoc, reactFlowInstance, isHovering }) {
  const classes = useStyles();

  const [mousePosition, rfPosition] = useCursorPosition(parentRef, reactFlowInstance);
  const { currentUser, clientID, colorSeed } = useAuth();
  const prevPosition = usePrevious(rfPosition);

  useEffect(() => {
    console.log('isHovering', isHovering);

    const addCursorNode = (key, localCurrentUser, clientID, newPosition) => {
      const newNode = {
        id: key,
        key: key,
        type: 'CursorNode',
        data: {
          nodeKey: key,
          displayName: localCurrentUser.displayName,
          clientID: clientID,
          collabColor: getColor(50, colorSeed),
        },
        selectable: false,
        draggable: false,
        connectable: false,
        position: { x: newPosition.x, y: newPosition.y },
      };
      const yNode = new Y.Map();
      for (let [k, v] of Object.entries(newNode)) {
        yNode.set(k, v);
      }
      yElements.push([yNode]);
    };

    const deleteCursorNode = (key, yElements) => {
      if (key && yElements) {
        const elmIndex = yElements.toJSON().findIndex((elm) => elm.id === key);
        return yElements.toArray().length > 0 && yElements.delete(elmIndex, 1);
      }
      return console.error('ProviderFlow.useEffect().deleteElement(): key or yElements undefined', { key, yElements });
    };

    const localCurrentUser = currentUser;
    const key = `user-${localCurrentUser.uid}-${clientID}`;
    const yElements = yDoc.current && yDoc.current.getArray('elements');
    const localCursorNodeIndex = yDoc.current && yElements.toJSON().findIndex((elm) => elm.id === key);

    if (isHovering && localCursorNodeIndex === -1 && rfPosition.x !== null && rfPosition.y !== null) {
      addCursorNode(key, localCurrentUser, clientID, rfPosition);
    }
    if (!isHovering && localCursorNodeIndex !== -1) {
      deleteCursorNode(key, yElements);
    }

  }, [isHovering, currentUser, clientID, yDoc])

  useEffect(() => {
    const localCurrentUser = currentUser;

    const updateCursorPosition = (index, newPosition) => {
      const updateNode = yDoc.current.getArray('elements').get(index);
      updateNode && updateNode.set && updateNode.set('position', { x: newPosition.x, y: newPosition.y });
    };

    const key = `user-${localCurrentUser.uid}-${clientID}`;
    const yElements = yDoc.current && yDoc.current.getArray('elements');
    const localCursorNodeIndex = yDoc.current && yElements.toJSON().findIndex((elm) => elm.id === key);

    if (rfPosition?.x !== prevPosition?.x && rfPosition?.y !== prevPosition?.y) {
      if (localCursorNodeIndex !== -1) {
        if (mousePosition.x !== null && mousePosition.y !== null) {
          updateCursorPosition(localCursorNodeIndex, rfPosition);
        }
      }
    }
  }, [prevPosition, rfPosition, currentUser, clientID, yDoc]);

  const target = React.useRef(null);

  useEvent(target, 'click', (event) => console.log(event))

  return (
    <>
      <div id="rfCanvasRect" ref={target} className={classes.rfCanvasRect}>
        <div>dfdsfsdf</div>
      </div>
      <InfoDisplay mousePosition={mousePosition} rfPosition={rfPosition} />
    </>
  );
}
