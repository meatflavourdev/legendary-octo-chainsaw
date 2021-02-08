import React, { useState, useEffect } from 'react';
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import config from "../../config"

/**
 *
 * @param  {string} doc_id
 * @return []
 */
const useYDoc = function (doc_id) {
  // Create ref for yjs Y.Doc
  const yDoc = React.useRef(null);
  // Create ref for awareness protocol
  const awareness = React.useRef(null);

  // Allow other components to react to websocket sync state
  const [wsSync, setWsSync] = useState(false);

  //Environment variables
  const wsServerUrl = config.yjsws.wsServerUrl;
  const wsRoomname = doc_id;

  useEffect(() => {
    console.log(`Loading Y.Doc: ${doc_id}`);
    yDoc.current = new Y.Doc({ guid: doc_id });

    console.log(`yjs-server serverUrl: ${wsServerUrl} roomname: ${wsRoomname}`);
    const wsProvider = new WebsocketProvider(
      wsServerUrl,
      wsRoomname,
      yDoc.current,
    );

    //Get the awareness object from the websocket provider
    awareness.current = wsProvider.awareness;

    // Log connected status
    wsProvider.on('sync', (status) => console.log(`Websocket status: ${status ? 'Connected' : 'Not Connected'}`));

    // Update synced state on websocket sync
    wsProvider.on('sync', (isSynced) => setWsSync(isSynced));

    // Set default sync state to false to invalidate previous states.
    setWsSync(false);

    return () => wsProvider.destroy();
  }, [doc_id, wsServerUrl, wsRoomname]);

  return [yDoc, wsSync, awareness];
}

export default useYDoc;
