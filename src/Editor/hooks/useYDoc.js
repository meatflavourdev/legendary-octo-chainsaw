import React, { useState, useEffect } from 'react';
import { useCallbackRef } from 'use-callback-ref';
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { throttle } from 'throttle-debounce';
import config from "../../config"

import { useAuth } from '../../contexts/AuthContext';

/**
 *
 * @param  {string} doc_id
 * @return []
 */
const useYDoc = function (doc_id) {
  const { currentUser } = useAuth();
  const currentUserArr = {
    displayName: currentUser.displayName,
    //email: currentUser.email,
    photoURL: currentUser.photoURL,
    uid: currentUser.uid,
    isAnonymous: currentUser.isAnonymous,
  };

  // Create ref for yjs Y.Doc
  const yDoc = React.useRef(null);

  // Allow other components to react to websocket sync state
  const [wsSync, setWsSync] = useState(false);

  // Awareness protocol state
  const [awarenessState, setAwarenessState] = useState([]);

  // Awareness reference
  const onAwarenessRefUpdate = (newValue) => {
    if (newValue) {
      //console.log(`awareness: `, newValue);
      newValue.setLocalState({
        clientID: newValue.clientID,
        lastUpdated: newValue.meta.has(newValue.clientID) ? newValue.meta.get(newValue.clientID).lastUpdated : {},
        ...currentUserArr,
      });
      const newState = Array.from(newValue.getStates().values());
      setAwarenessState((state) => ({
        ...state,
        ...newState,
      }));
    }
  };
  const awarenessRef = useCallbackRef([], onAwarenessRefUpdate);

  function updatePresence(newState) {
    awarenessRef.current && (typeof awarenessRef.current.setLocalStateField === 'function') && awarenessRef.current.setLocalStateField('presence', newState);
  }

  //Environment variables
  const wsServerUrl = config.yjsws.wsServerUrl;
  const wsRoomname = doc_id;

  useEffect(() => {
    console.log(`-- Loading Y.Doc: ${doc_id}`);
    console.log(`-- serverUrl: ${wsServerUrl} roomname: ${wsRoomname}`);

    yDoc.current = new Y.Doc({ guid: doc_id });

    const wsProvider = new WebsocketProvider(wsServerUrl, wsRoomname, yDoc.current);

    //Get the awareness object from the websocket provider
    const awareness = wsProvider.awareness;
    awarenessRef.current = awareness;

    // Throttled console output that will only output every 1000ms
    const throttledAwareConsole = throttle(1000, (newState) => {
      console.log('awareness changed:', awarenessState);
    });

    // Throttled console output that will only output every 1000ms
    const throttledAwareStateUpdate = throttle(30, (newState) => {
      setAwarenessState((state) => ({
        ...state,
        ...newState,
      }));
    });

    // Observe when any user updates their awareness information
    const awarenessUpdate = () => {
      const newState = Array.from(awareness.getStates().values());
      throttledAwareStateUpdate(newState);
      throttledAwareConsole(newState);
    }
    awareness.on('change', awarenessUpdate);

    // Log connected status
    wsProvider.on('sync', (status) => console.log(`Websocket status: ${status ? 'Connected' : 'Not Connected'}`));

    // Update synced state on websocket sync
    wsProvider.on('sync', (isSynced) => setWsSync(isSynced));

    // Set default sync state to false to invalidate previous states.
    setWsSync(false);

    return () => {
      awareness.off('change', awarenessUpdate);
      wsProvider.destroy();
    }
  }, [doc_id, wsServerUrl, wsRoomname, awarenessRef]);

  return [wsSync, yDoc, awarenessState, updatePresence];
};

export default useYDoc;
