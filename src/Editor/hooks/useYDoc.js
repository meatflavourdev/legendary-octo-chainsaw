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
  // Get yjs lib and create a reference to it
  //const awareness = React.useRef(null);
  const yDoc = React.useRef(null);

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
      yDoc.current
    );

    // Update synced state on websocket sync
    wsProvider.on('sync', (isSynced) => setWsSync(isSynced));

    setWsSync(false);

    return () => wsProvider.destroy();
  }, [doc_id, wsServerUrl, wsRoomname]);

  return [yDoc, wsSync];
}

export default useYDoc;
