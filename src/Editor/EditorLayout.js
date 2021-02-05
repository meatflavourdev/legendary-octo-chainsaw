import React from 'react';
import { useParams } from 'react-router-dom';
import { users } from './users.js';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import ProviderFlow from './ProviderFlow';
import DrawerDocs from './components/DrawerDocs';
import DrawerChat from './components/DrawerChat';
import { ReactFlowProvider } from 'react-flow-renderer';
import EditorAppBar from './components/EditorAppBar.js';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.16)',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  docTitle: {
    marginLeft: '0.75em',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  avatarGroup: {
    marginRight: '10px',
  },
  userAvatar: {
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
}));

export default function EditorLayout() {
  // Get doc_id from router
  let { doc_id } = useParams();

  const [auth, setAuth] = React.useState(true);
  const classes = useStyles();
  const [openDocs, setOpenDocs] = React.useState(false);
  const [openChat, setOpenChat] = React.useState(false);

  const handleDocsDrawerOpen = () => {
    setOpenDocs(true);
  };

  const handleDocsDrawerClose = () => {
    setOpenDocs(false);
  };

  const handleChatDrawerToggle = () => {
    setOpenChat(!openChat);
  };

  const userAvatars = [];

  for (const user of users) {
    userAvatars.push(
      <Avatar key={user.displayName} src={user.photoURL} className={classes.userAvatar} alt={user.displayName}></Avatar>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <EditorAppBar
        docName={doc_id}
        auth={auth}
        openDocs={openDocs}
        handleDocsDrawerOpen={handleDocsDrawerOpen}
        handleChatDrawerToggle={handleChatDrawerToggle}
        userAvatars={userAvatars}
        drawerWidth={drawerWidth}
      />
      <DrawerDocs openDocs={openDocs} handleDocsDrawerClose={handleDocsDrawerClose} />
        <ReactFlowProvider>
          <ProviderFlow />
        </ReactFlowProvider>
      <DrawerChat openChat={openChat} />
    </div>
  );
}
