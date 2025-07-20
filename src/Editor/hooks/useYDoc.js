import React, { useState, useEffect } from "react";
import { useCallbackRef } from "use-callback-ref";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { WebrtcProvider } from "y-webrtc";
import { IndexeddbPersistence } from 'y-indexeddb';
import { useAuth } from "../../contexts/AuthContext";
import { useLocalDb } from "../../contexts/LocalDbContext";
import * as awarenessProtocol from "../../y-protocols/awareness";
import config from "../../config";

/**
 * Sets up the yDoc and
 * @param  {string} doc_id
 * @param {Object} currentUser
 * @return []
 */
const useYDoc = function (doc_id, currentUser) {
  // Create ref for yjs Y.Doc
  const yDoc = React.useRef(new Y.Doc());

  // Allow other components to react to sync state
  const [syncState, setSyncState] = useState(false);

  // Awareness protocol state
  const [awarenessState, setAwarenessState] = useState([]);

  // Get auth context
  const { clientID, setClientID } = useAuth();
  
  // Get local DB context to check if we're in local mode
  const { isLocalMode } = useLocalDb ? useLocalDb() : { isLocalMode: true };

  // Awareness reference
  const onAwarenessRefUpdate = (newValue, lastValue) => {
    if (newValue) {
      newValue.setLocalState({
        clientID: newValue.clientID,
        lastUpdated: newValue.meta.has(newValue.clientID)
          ? newValue.meta.get(newValue.clientID).lastUpdated
          : {},
        collabColor: { ...currentUser.collabColor },
        ...currentUser,
      });
      const newState = Array.from(newValue.getStates().values());
      setAwarenessState(newState);
      setClientID(newValue.clientID);
      //console.log('useYDoc.onAwarenessRefUpdate(): Updated currentUser fired', currentUser);
    }
    lastValue.destroy();
    newValue.on("change", () => {
      console.log(
        "useYDoc.useEffect(): Awareness change fired",
        awarenessRef.current.getStates()
      );
      setAwarenessState(Array.from(awarenessRef.current.getStates().values()));
    });
  };
  const awarenessRef = useCallbackRef(
    new awarenessProtocol.Awareness(yDoc.current),
    onAwarenessRefUpdate
  );

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
  const roomName =
    process.env.NODE_ENV === "production" ? doc_id : `${doc_id}-development`;

  useEffect(() => {
    console.log(`────────────────────────────────────────────────`);
    console.log(`%c doc_id: ${doc_id}`, "color: green; font-weight: bold;");
    console.log(`%c Local Mode: ${isLocalMode}`, "color: green; font-weight: bold;");
    console.log(
      `%c serverUrl: ${wsServerUrl}`,
      "color: blue; font-weight: bold;"
    );
    console.log(
      `%c Environment: ${process.env.NODE_ENV} `,
      "color: blue; font-weight: bold;"
    );
    console.log(`%c roomname: ${roomName}`, "color: blue; font-weight: bold;");
    console.log(`────────────────────────────────────────────────`);

    yDoc.current = new Y.Doc({ guid: doc_id });
    
    // Set up IndexedDB persistence for offline support
    const indexeddbProvider = new IndexeddbPersistence(roomName, yDoc.current);
    indexeddbProvider.on('synced', () => {
      console.log('Content from IndexedDB loaded');
    });

    // Set up providers based on mode
    let wsProvider;
    let webrtcProvider;
    let awareness;
    
    // In local mode, prioritize WebRTC
    if (isLocalMode) {
      // Create WebRTC provider first (for local p2p connections)
      webrtcProvider = new WebrtcProvider(roomName, yDoc.current, {
        signaling: ['wss://signaling.yjs.dev', 'wss://y-webrtc-signaling-eu.herokuapp.com', 'wss://y-webrtc-signaling-us.herokuapp.com'],
        password: null, // No password required for the demo
        awareness: awarenessRef.current,
        maxConns: 20, // Maximum number of connections
        filterBcConns: true, // Filter broadcast connections
        peerOpts: {}, // Peer connection options
      });
      
      // Use WebRTC awareness
      awareness = webrtcProvider.awareness;
      
      // Update sync state when peers connect/disconnect
      webrtcProvider.on('peers', (peers) => {
        console.log('WebRTC peers:', peers);
        setSyncState(peers.length > 0);
      });
      
      // Also create WebSocket provider as fallback, but don't connect immediately
      wsProvider = new WebsocketProvider(
        wsServerUrl,
        roomName,
        yDoc.current,
        { connect: false } // Don't connect immediately
      );
      
      // Connect to WebSocket only if WebRTC fails after a timeout
      setTimeout(() => {
        if (!syncState) {
          console.log('WebRTC connection not established, connecting to WebSocket as fallback');
          wsProvider.connect();
          
          // Update sync state based on WebSocket connection
          wsProvider.on('sync', (isSynced) => {
            console.log(`WebSocket fallback status: ${isSynced ? "Connected" : "Not Connected"}`);
            setSyncState(isSynced);
          });
        }
      }, 5000); // Wait 5 seconds for WebRTC to connect
    } else {
      // In cloud mode, use WebSocket provider
      wsProvider = new WebsocketProvider(
        wsServerUrl,
        roomName,
        yDoc.current
      );
      
      // Also create WebRTC provider for peer-to-peer connections
      webrtcProvider = new WebrtcProvider(roomName, yDoc.current, {
        signaling: ['wss://signaling.yjs.dev', 'wss://y-webrtc-signaling-eu.herokuapp.com', 'wss://y-webrtc-signaling-us.herokuapp.com'],
        password: null,
        awareness: awarenessRef.current,
      });
      
      // Use WebSocket awareness
      awareness = wsProvider.awareness;
      
      // Update sync state based on WebSocket connection
      wsProvider.on('sync', (isSynced) => {
        console.log(`WebSocket status: ${isSynced ? "Connected" : "Not Connected"}`);
        setSyncState(isSynced);
      });
    }

    // Set awareness reference
    awarenessRef.current = awareness;
    window.awareness = awareness;

    // Set default sync state to false to invalidate previous states
    setSyncState(false);

    return () => {
      yDoc.current.destroy();
      awareness.destroy();
      if (wsProvider) wsProvider.destroy();
      if (webrtcProvider) webrtcProvider.destroy();
      if (indexeddbProvider) indexeddbProvider.destroy();
    };
  }, [doc_id, wsServerUrl, roomName, isLocalMode]);

  return [syncState, yDoc, awarenessState, awarenessRef];
};

export default useYDoc;
