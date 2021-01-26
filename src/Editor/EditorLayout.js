import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChatIcon from '@material-ui/icons/Chat';
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ProfileMenu from '../components/ProfileMenu';
import ShareMenu from '../components/ShareMenu';
import ProviderFlow from './ProviderFlow';
import DrawerDocs from './components/DrawerDocs';
import DrawerChat from './components/DrawerChat';

import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import yellow from '@material-ui/core/colors/yellow';
import deepOrange from '@material-ui/core/colors/deepOrange';


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
        elevation={3}
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
          <Brightness4RoundedIcon color='secondary'/>
          <Typography className={classes.docTitle} variant="h6">
            Document Name
          </Typography>
          <AvatarGroup max={10} spacing="25">
          <Avatar className={classes.deepPurple}>N</Avatar>
          <Avatar className={classes.purple}>OP</Avatar>
          <Avatar className={classes.purple}>OP</Avatar>
          <Avatar className={classes.purple}>OP</Avatar>
          <Avatar className={classes.purple}>OP</Avatar>
          <Avatar className={classes.deepPurple}>N</Avatar>
          <Avatar className={classes.purple}>OP</Avatar>
          <Avatar className={classes.purple}>OP</Avatar>
          <Avatar className={classes.purple}>OP</Avatar>
          <Avatar className={classes.purple}>OP</Avatar>
          </AvatarGroup>
          <IconButton onClick={handleChatDrawerToggle} color="inherit">
            <Badge badgeContent={4} color="secondary">
              <ChatIcon />
            </Badge>
          </IconButton>
          {auth && <ShareMenu />}
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <DrawerDocs openDocs={openDocs} handleDocsDrawerClose={handleDocsDrawerClose} />
      <ProviderFlow />
      <DrawerChat openChat={openChat} />
    </div>
  );
}
