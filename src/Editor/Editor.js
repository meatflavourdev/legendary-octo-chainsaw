import React from 'react';
import { useParams } from 'react-router-dom';
import { users } from './data/users.js';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProviderFlow from './ProviderFlow';
import DrawerDocs from './components/Drawers/DrawerDocs';
import DrawerChat from './components/Drawers/DrawerChat';
import { ReactFlowProvider } from 'react-flow-renderer';
import EditorAppBar from './components/EditorAppBar.js';

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

  // Get a reference to Yjs yDoc, awareness, and the websocket sync state boolean
  const [wsSync, yDoc, awareness] = useYDoc(doc_id);

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
        users={users}
        wsSync={wsSync}
        yDoc={yDoc}
        awareness={awareness}
      />
      <DrawerDocs openDocs={openDocs} setOpenDocs={setOpenDocs} />
        <ReactFlowProvider>
          <ProviderFlow setOpenDocs={setOpenDocs} yDoc={yDoc} wsSync={wsSync} />
        </ReactFlowProvider>
      <DrawerChat openChat={openChat} yDoc={yDoc} wsSync={wsSync} />
    </div>
  );
}
