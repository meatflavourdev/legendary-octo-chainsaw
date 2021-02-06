import React from 'react';
import { useParams } from 'react-router-dom';
import { users } from './data/users.js';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProviderFlow from './ProviderFlow';
import DrawerDocs from './components/DrawerDocs';
import DrawerChat from './components/DrawerChat';
import { ReactFlowProvider } from 'react-flow-renderer';
import EditorAppBar from './components/EditorAppBar.js';

// Yjs Imports
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

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

  // Get yjs lib and create a reference to it
  //const awareness = React.useRef(null);
  const ydoc = React.useRef(null);

  //Environment variables
  const wsProtocol = process.env.REACT_APP_WSPROTOCOL || "wss";
  const wsHost = process.env.REACT_APP_WSHOST || "localhost";
  const wsPort = process.env.REACT_APP_WSPORT || 5001;
  const wsServerUrl = `${wsProtocol}://${wsHost}${wsPort == 80 ? '' : ':' + wsPort}`;
  const wsRoomname = doc_id;

  const classes = useStyles();
  const [openDocs, setOpenDocs] = React.useState(false);
  const [openChat, setOpenChat] = React.useState(false);

  React.useEffect(() => {
    console.log(`Loading Y.Doc: ${doc_id}`);
    ydoc.current = new Y.Doc({ guid: doc_id });

    console.log(`yjs-server serverUrl: ${wsServerUrl} roomname: ${wsRoomname}`);
    const wsProvider = new WebsocketProvider(
      wsServerUrl,
      wsRoomname,
      ydoc.current
    );

    const chatData = ydoc.current.getArray("messages");

    return () => wsProvider.destroy();
  });

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
      />
      <DrawerDocs openDocs={openDocs} setOpenDocs={setOpenDocs} />
        <ReactFlowProvider>
          <ProviderFlow setOpenDocs={setOpenDocs} />
        </ReactFlowProvider>
      <DrawerChat openChat={openChat} />
    </div>
  );
}
