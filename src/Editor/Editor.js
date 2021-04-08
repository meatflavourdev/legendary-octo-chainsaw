import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProviderFlow from './ProviderFlow';
import DrawerDocs from './components/Drawer/DrawerDocs';
import DrawerChat from './components/Drawer/DrawerChat';
import EditorAppBar from './components/AppBar/EditorAppBar';
import { useAuth } from '../contexts/AuthContext';
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { inspect } from "@xstate/inspect";

import useYDoc from './hooks/useYDoc';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
  },
}));

inspect({
  url: "https://statecharts.io/inspect",
  iframe: false
});

const editorMachine = Machine({
  id: 'editor',
  initial: 'idle',
  context: {
    auth_retries: 0,
    access_retries: 0,
    sync_retries: 0,
  },
  states: {
    idle: {
      on: {
        RESOLVE: 'resolving',
      },
    },
    resolving: {
      on: {
        EXISTS: 'checking_auth',
        NOT_EXISTS: 'failure_404',
      },
    },
    failure_404: {
      on: {
        NAVIGATE: {
          target: 'resolving',
          actions: [
            assign({ auth_retries: (context) => 0 }),
            assign({ access_retries: (context) => 0 }),
            assign({ sync_retries: (context) => 0 }),
          ],
        },
      },
    },
    checking_auth: {
      on: {
        AUTHED: 'accessing',
        NOT_AUTHED: 'authenticating',
      },
    },
    authenticating: {
      on: {
        RESOLVE: 'accessing',
        REJECT: 'failure_auth',
      },
    },
    failure_auth: {
      on: {
        RETRY_AUTH: {
          target: 'authenticating',
          actions: assign({
            auth_retries: (context, event) => context.auth_retries + 1,
          }),
        },
      },
    },
    accessing: {
      on: {
        PUBLIC: 'syncing',
        ACCESS_GRANTED: 'syncing',
        ACCESS_DENIED: 'failure_notauthorized',
        PRIVATE: 'failure_notauthorized',
        REJECT: 'failure_accessing',
      },
    },
    failure_accessing: {
      on: {
        RETRY_ACCESS: {
          target: 'accessing',
          actions: assign({
            access_retries: (context, event) => context.access_retries + 1,
          }),
        },
      },
    },
    failure_notauthorized: {
      on: {
        NAVIGATE: {
          target: 'resolving',
          actions: [
            assign({ auth_retries: (context) => 0 }),
            assign({ access_retries: (context) => 0 }),
            assign({ sync_retries: (context) => 0 }),
          ],
        },
      },
    },
    syncing: {
      on: {
        RESOLVE: 'synced',
        REJECT: 'failure_sync',
      },
    },
    failure_sync: {
      on: {
        RETRY_SYNC: {
          target: 'syncing',
          actions: assign({
            sync_retries: (context, event) => context.sync_retries + 1,
          }),
        },
      },
    },
    synced: {
      on: {
        NAVIGATE: {
          target: 'resolving',
          actions: [
            assign({ auth_retries: (context) => 0 }),
            assign({ access_retries: (context) => 0 }),
            assign({ sync_retries: (context) => 0 }),
          ],
        },
      },
    },
  },
});

export default function Editor() {
  // Get doc_id from router
  let { doc_id } = useParams();

  const [current, send] = useMachine(editorMachine, { devTools: true });

  const classes = useStyles();
  const [openDocs, setOpenDocs] = React.useState(false);
  const [openChat, setOpenChat] = React.useState(false);

  const { currentUser } = useAuth();

  // Get a reference to Yjs yDoc, awareness, and the websocket sync state boolean
  const [wsSync, yDoc, awarenessState, awarenessRef] = useYDoc(doc_id, currentUser);

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
      <ProviderFlow setOpenDocs={setOpenDocs} yDoc={yDoc} wsSync={wsSync} awarenessRef={awarenessRef} />
      <DrawerChat openChat={openChat} yDoc={yDoc} wsSync={wsSync} />
    </div>
  );
}
