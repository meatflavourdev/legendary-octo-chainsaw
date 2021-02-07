import React, { useEffect } from 'react';
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
  const wsProvider = React.useRef(null);

  //Environment variables
  const wsServerUrl = config.yjsws.wsServerUrl;
  const wsRoomname = doc_id;

  useEffect(() => {
    console.log(`Loading Y.Doc: ${doc_id}`);
    yDoc.current = new Y.Doc({ guid: doc_id });

    console.log(`yjs-server serverUrl: ${wsServerUrl} roomname: ${wsRoomname}`);
    wsProvider.current = new WebsocketProvider(
      wsServerUrl,
      wsRoomname,
      yDoc.current
    );

    return () => wsProvider.current.destroy();
  }, [doc_id, wsServerUrl, wsRoomname]);

  return [yDoc, wsProvider];
}

export default useYDoc;
