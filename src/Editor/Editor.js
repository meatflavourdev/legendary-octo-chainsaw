import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProviderFlow from './ProviderFlow';
import DrawerDocs from './components/Avatar/DrawerDocs';
import DrawerChat from './components/Avatar/DrawerChat';
import { ReactFlowProvider } from 'react-flow-renderer';
import EditorAppBar from './components/EditorAppBar.js';

import { useHistory } from 'react-router-dom';
import firebase from "firebase";
import { useAuth } from '../contexts/AuthContext';

import useYDoc from './hooks/useYDoc'

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

  const classes = useStyles();
  const [openDocs, setOpenDocs] = React.useState(false);
  const [openChat, setOpenChat] = React.useState(false);

  const { currentUser } = useAuth();

  // Get a reference to Yjs yDoc, awareness, and the websocket sync state boolean
  const [wsSync, yDoc, awarenessState] = useYDoc(doc_id, currentUser);

  // TODO: Move Document CRUD logic here

  return (
    <div className={classes.root}>
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
      <DrawerDocs openDocs={openDocs} setOpenDocs={setOpenDocs} />
        <ReactFlowProvider>
          <ProviderFlow setOpenDocs={setOpenDocs} yDoc={yDoc} wsSync={wsSync} />
        </ReactFlowProvider>
      <DrawerChat openChat={openChat} yDoc={yDoc} wsSync={wsSync} />
    </div>
  );
}
