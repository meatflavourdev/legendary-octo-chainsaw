import React, { useState, useCallback } from 'react';
import { useListener } from 'react-bus';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChatIcon from '@material-ui/icons/Chat';
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';
import MoreIcon from '@material-ui/icons/MoreVert';
import AvatarGroup from '../Avatar/AvatarGroup';
import ProfileMenu from './ProfileMenu';
import ShareMenu from './ShareMenu';
import config from '../../../config';
import { Avatar } from '@material-ui/core';
import AvatarTooltip from '../Avatar/AvatarTooltip';
import ScaleLoader from '@bit/davidhu2000.react-spinners.scale-loader';

const drawerWidth = config.editor.drawerWidth;

const useStyles = makeStyles((theme) => ({
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
  scaleLoader: {
    padding: '1em',
    '& > div': {
      height: '23px',
      opacity: 0.97
    },
  },
  titleIcon: {
    fill: (props) => props.titleIconFill,
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
    boxShadow: '0 3px 6px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.12)',
    backgroundColor: '#03a9f4',
  },
}));

const EditorAppBar = function ({ docName, openDocs, openChat, setOpenDocs, setOpenChat, awarenessState = [] }) {
  const cssProps = { titleIconFill: '#00e676' };
  const classes = useStyles(cssProps);

  const userAvatars = awarenessState.map((user) => (
    <AvatarTooltip
      collabColor={user.collabColor}
      key={`avatar-${user.clientID}`}
      title={user.displayName}
      placement="bottom"
      arrow={true}
    >
      <Avatar
        src={user.photoURL}
        className={classes.userAvatar}
        style={{ backgroundColor: user.collabColor.hex, color: user.collabColor.isLight ? '#000' : '#FFF' }}
        alt={user.displayName}
      ></Avatar>
    </AvatarTooltip>
  ));
  const userNames = awarenessState.map((user) => user.displayName);

  const [docTitle, setDocTitle] = useState(false);

  // Listen for doc loaded and update navbar docTitle
  useListener('docLoaded', (doc) => setDocTitle(doc?.name));
  useListener('docUnloaded', () => setDocTitle(false));

  const scaleLoader = (docTitle) => {
    if (docTitle === false) {
      return (
        <div className={classes.scaleLoader}>
          <ScaleLoader height="20" width="8" color="#FFFFFF" />
        </div>
      );
    }
    return <></>;
  };

  return (
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
          onClick={() => setOpenDocs(!openDocs)}
          edge="start"
          className={clsx(classes.menuButton, openDocs && classes.hide)}
        >
          <MenuIcon style={{ fontSize: 30 }} />
        </IconButton>
        <Brightness4RoundedIcon className={classes.titleIcon} style={{ fontSize: 24 }} />
        {scaleLoader(docTitle)}
        <Typography className={classes.docTitle} variant="h6">
          {docTitle}
        </Typography>
        <AvatarGroup className={classes.avatarGroup} max={10} spacing={10} usernames={userNames}>
          {userAvatars}
        </AvatarGroup>
        <IconButton onClick={() => setOpenChat(!openChat)} color="inherit">
          <Badge badgeContent={'!'} color="secondary">
            <ChatIcon style={{ fontSize: 26 }} />
          </Badge>
        </IconButton>

        <ShareMenu />
        <ProfileMenu />

{/*         <IconButton color="inherit">
          <MoreIcon style={{ fontSize: 26 }} />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default EditorAppBar;
