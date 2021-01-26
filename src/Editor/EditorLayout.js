import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChatIcon from '@material-ui/icons/Chat';
import ProfileMenu from '../components/ProfileMenu';
import ShareMenu from '../components/ShareMenu';
import ProviderFlow from './ProviderFlow';
import logo from '../logo.png';

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
  entropyLogo: {
    display: 'flex',
    justifyContent: 'left',
    flexGrow: 1,
  },
  entropyLogoImg: {
    width: '32px',
    height: '32px',
    marginLeft: '0.8em',
    marginRight: '0.5em',
  },
  entropyLogoText: {

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
  drawerDocs: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'absolute',
  },
  drawerPaperDocs: {
    width: drawerWidth,
  },
  drawerHeaderDocs: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerChat: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 900,
  },
  drawerPaperChat: {
    width: drawerWidth,
  },
  drawerHeaderChat: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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
      <Drawer
        className={classes.drawerDocs}
        variant="persistent"
        anchor="left"
        open={openDocs}
        classes={{
          paper: classes.drawerPaperDocs,
        }}
      >
        <div className={classes.drawerHeaderDocs}>
          <div className={classes.entropyLogo}>
            <img className={classes.entropyLogoImg} src={logo} alt="Entropy Logo" height="32" width="32" />
            <Typography className={classes.entropyLogoText} variant="h6" className={classes.title}>
              Entropy
            </Typography>
          </div>
          <IconButton onClick={handleDocsDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.flowContainer, {
          [classes.contentShift]: openDocs,
        })}
      >
        <ProviderFlow />
      </main>
      <Drawer
        className={classes.drawerChat}
        variant="persistent"
        anchor="right"
        open={openChat}
        classes={{
          paper: classes.drawerPaperChat,
        }}
      >
        <div className={classes.drawerHeaderChat}></div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
