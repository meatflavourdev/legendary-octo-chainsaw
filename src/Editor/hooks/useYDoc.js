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
const useYDoc = function (doc_id) {
  const { currentUser } = useAuth();
  const currentUserArr = {
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL,
    uid: currentUser.uid,
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
      newValue.setLocalState({ clientID: newValue.clientID, ...currentUserArr })
      const newState = Array.from(newValue.getStates().values());
      setAwarenessState(newState);
    }
  };
  const awarenessRef = useCallbackRef([], onAwarenessRefUpdate);

  // Console log on state change
  useEffect(() => {
    //console.log('awarenessState:', awarenessState);
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

    // You can observe when a any user updated their awareness information
    awareness.on('change', () => {
      // Whenever somebody updates their awareness information,
      // we log all awareness information from all users.
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
