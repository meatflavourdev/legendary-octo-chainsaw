import React, { useState, useEffect } from 'react';
import { useCallbackRef } from 'use-callback-ref';
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import config from "../../config"

import { useAuth } from '../../contexts/AuthContext';

/**
 *
 * @param  {string} doc_id
 * @return []
 */
const useYDoc = function (doc_id, currentUser) {
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
        ...currentUser
      })
      const newState = Array.from(newValue.getStates().values());
      setAwarenessState(newState);
    }
  };
  const awarenessRef = useCallbackRef([], onAwarenessRefUpdate);

  // Update awareness on currentUser change
  useEffect(() => {
    awarenessRef.current && awarenessRef.current.setLocalState && awarenessRef.current.setLocalState({...currentUser});
  }, [currentUser])

  // Console log on state change
  useEffect(() => {
    //console.log('awarenessState:', awarenessState);
    //console.log('awareness:', awarenessRef.current);
  }, [awarenessState]);

  //Environment variables
  const wsServerUrl = config.yjsws.wsServerUrl;
  const wsRoomname = doc_id;

  useEffect(() => {
    console.log(`------------------------------`);
    console.log(`Loading Y.Doc: ${doc_id}`);
    console.log(`serverUrl: ${wsServerUrl} roomname: ${wsRoomname}`);
    console.log(`------------------------------`);

    yDoc.current = new Y.Doc({ guid: doc_id });

    const wsProvider = new WebsocketProvider(
      wsServerUrl,
      wsRoomname,
      yDoc.current,
    );

    //Get the awareness object from the websocket provider
    const awareness = wsProvider.awareness;
    awarenessRef.current = awareness;

    // Observe when any user updates their awareness information
    awareness.on('change', () => {
      const newState = Array.from(awareness.getStates().values());
      setAwarenessState(newState);
    });

    // Log connected status
    wsProvider.on('sync', (status) => console.log(`Websocket status: ${status ? 'Connected' : 'Not Connected'}`));

    // Update synced state on websocket sync
    wsProvider.on('sync', (isSynced) => setWsSync(isSynced));

    // Set default sync state to false to invalidate previous states.
    setWsSync(false);

    return () => wsProvider.destroy();
  }, [doc_id, wsServerUrl, wsRoomname, awarenessRef]);

  return [wsSync, yDoc, awarenessState];
}

export default useYDoc;
