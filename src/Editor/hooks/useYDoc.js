import React, { useState, useEffect } from 'react';
import { useCallbackRef } from 'use-callback-ref';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { WebrtcProvider } from 'y-webrtc'
import { useAuth } from '../../contexts/AuthContext';
import * as awarenessProtocol from '../../y-protocols/awareness';
import config from '../../config';

/**
 * Sets up the yDoc and
 * @param  {string} doc_id
 * @param {Object} currentUser
 * @return []
 */
const useYDoc = function (doc_id, currentUser) {
  // Create ref for yjs Y.Doc
  const yDoc = React.useRef(new Y.Doc());

  // Allow other components to react to websocket sync state
  const [wsSync, setWsSync] = useState(false);

  // Awareness protocol state
  const [awarenessState, setAwarenessState] = useState([]);

  const { clientID, setClientID } = useAuth();

  // Awareness reference
  const onAwarenessRefUpdate = (newValue, lastValue) => {
    if (newValue) {
      newValue.setLocalState({
        clientID: newValue.clientID,
        lastUpdated: newValue.meta.has(newValue.clientID) ? newValue.meta.get(newValue.clientID).lastUpdated : {},
        collabColor: { ...currentUser.collabColor },
        ...currentUser,
      });
      const newState = Array.from(newValue.getStates().values());
      setAwarenessState(newState);
      setClientID(newValue.clientID)
      //console.log('useYDoc.onAwarenessRefUpdate(): Updated currentUser fired', currentUser);
    }
    lastValue.destroy();
    newValue.on('change', () => {
      console.log('useYDoc.useEffect(): Awareness change fired', awarenessRef.current.getStates());
        setAwarenessState(Array.from(awarenessRef.current.getStates().values()));
    });
  };
  const awarenessRef = useCallbackRef(new awarenessProtocol.Awareness(yDoc.current), onAwarenessRefUpdate);

  // Update awareness on currentUser change
  useEffect(() => {
    //console.log('useYDoc.useEffect(): Updated currentUser fired', currentUser);
    if (awarenessRef.current && awarenessRef.current.setLocalState) {
      const newLocalState = {
        clientID: clientID,
        collabColor: { ...currentUser.collabColor },
        cursorPosition: { ...currentUser.cursorPosition },
        ...currentUser,
      };
      awarenessRef.current.setLocalState(newLocalState);
    }
  }, [currentUser, clientID]);

  // Console log on state change
/*     useEffect(() => {
    console.log('awarenessState:', awarenessState);
    //console.log('awareness:', awarenessRef.current);
    //console.log('beep')
  }, [awarenessState]); */

  //Environment variables
  const wsServerUrl = config.yjsws.wsServerUrl;
  const roomName = process.env.NODE_ENV === 'production' ? doc_id : `${doc_id}-development`;


  useEffect(() => {
    console.log(`────────────────────────────────────────────────`);
    console.log(`%c doc_id: ${doc_id}`, 'color: green; font-weight: bold;');
    console.log(`%c serverUrl: ${wsServerUrl}`, 'color: blue; font-weight: bold;');
    console.log(`%c Environment: ${process.env.NODE_ENV} `, 'color: blue; font-weight: bold;');
    console.log(`%c roomname: ${roomName}`, 'color: blue; font-weight: bold;');
    console.log(`────────────────────────────────────────────────`);

    yDoc.current = new Y.Doc({ guid: doc_id });

    const wsProvider = new WebsocketProvider(wsServerUrl, roomName, yDoc.current);
    new WebrtcProvider(roomName, yDoc.current, {});

    //Get the awareness object from the websocket provider
    const awareness = wsProvider.awareness;
    awarenessRef.current = awareness;

    // Observe when any user updates their awareness information


    // Log connected status
    wsProvider.on('sync', (status) => console.log(`Websocket status: ${status ? 'Connected' : 'Not Connected'}`));

    // Update synced state on websocket sync
    wsProvider.on('sync', (isSynced) => setWsSync(isSynced));

    // Set default sync state to false to invalidate previous states.
    setWsSync(false);

    return () => {
      awareness.destroy();
      wsProvider.destroy();
    }
  }, [doc_id, wsServerUrl, roomName]);

  return [wsSync, yDoc, awarenessState, awarenessRef];
};

export default useYDoc;
