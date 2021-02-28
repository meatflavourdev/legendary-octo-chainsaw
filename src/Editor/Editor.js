import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProviderFlow from './ProviderFlow';
import DrawerDocs from './components/Drawers/DrawerDocs';
import DrawerChat from './components/Drawers/DrawerChat';
import { ReactFlowProvider } from 'react-flow-renderer';
import EditorAppBar from './components/EditorAppBar.js';

import useYDoc from './hooks/useYDoc'
import { useAuth } from '../contexts/AuthContext';
import useMouse from '@react-hook/mouse-position'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
  },
}));



export default function Editor() {
  // Get doc_id from router
  let { doc_id } = useParams();

  // Construct the user object
  const { currentUser } = useAuth();
  const user = currentUser ? {
    displayName: currentUser.displayName,
    email: currentUser.email,
    photoURL: currentUser.photoURL,
    uid: currentUser.uid,
    isAnonymous: currentUser.isAnonymous,
    metadata: currentUser.metadata,
    providerData: currentUser.providerData,
  } : null;

  // Setup ref and useMouse hook for cursor position tracking
  const mouseDomRef = React.useRef(null);
  const mousePosition = useMouse(mouseDomRef);

  // Get a reference to Yjs yDoc, awareness, and the websocket sync state boolean
  const [wsSync, yDoc, awarenessState, updatePresence] = useYDoc(doc_id);

  // Update presence object when mousePosition changes
  React.useLayoutEffect(() => {
    console.log('mousePosition: ', mousePosition);
    updatePresence(mousePosition);
  }, [mousePosition, mousePosition.pageX, mousePosition.pageY, updatePresence]);

  const classes = useStyles();
  const [openDocs, setOpenDocs] = React.useState(false);
  const [openChat, setOpenChat] = React.useState(false);

  // TODO: Move Document CRUD logic here

  return (
    <div ref={mouseDomRef} className={classes.root}>
      <CssBaseline />
      <EditorAppBar
        docName={doc_id}
        openDocs={openDocs}
        openChat={openChat}
        setOpenDocs={setOpenDocs}
        setOpenChat={setOpenChat}
        wsSync={wsSync}
        yDoc={yDoc}
        awarenessState={awarenessState}
      />
      <ul style={{
        position: 'absolute',
        height: 'fit-content',
        bottom: '1em',
        left: '3em',
        zIndex: 2000,
      }}>
        {/* {awarenessState && console.log('awarenessState: ', Object.values(awarenessState))} */}
      </ul>
      <DrawerDocs openDocs={openDocs} setOpenDocs={setOpenDocs} />
        <ReactFlowProvider>
        <ProviderFlow setOpenDocs={setOpenDocs} yDoc={yDoc} wsSync={wsSync} />
        </ReactFlowProvider>
      <DrawerChat openChat={openChat} yDoc={yDoc} wsSync={wsSync} user={user} />
    </div>
  );
}
