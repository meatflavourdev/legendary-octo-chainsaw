import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChatIcon from '@material-ui/icons/Chat';
import ProfileMenu from '../components/ProfileMenu';
import ShareMenu from '../components/ShareMenu';
import ProviderFlow from './ProviderFlow';
import DrawerDocs from './components/DrawerDocs';
import DrawerChat from './components/DrawerChat';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  flowContainer: {
    width: '100vw',
    height: '100vh',
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const [auth, setAuth] = React.useState(true);
  const classes = useStyles();
  const theme = useTheme();
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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDocs,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDocsDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, openDocs && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.docTitle} variant="h6">
            Document Name
          </Typography>
          <IconButton onClick={handleChatDrawerToggle} color="inherit">
            <ChatIcon />
          </IconButton>
          {auth && <ShareMenu />}
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <DrawerDocs
        openDocs={openDocs}
        handleDocsDrawerClose={handleDocsDrawerClose}
      />
        <ProviderFlow />
        <DrawerChat
          openChat={openChat}
        />
    </div>
  );
}
