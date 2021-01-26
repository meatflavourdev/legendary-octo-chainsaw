import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import logo from '../../logo.png';

import FolderIcon from '@material-ui/icons/Folder';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import FolderSharedRoundedIcon from '@material-ui/icons/FolderSharedRounded';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
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
  entropyLogoText: {},
  docFolder: {},
  docFileName: {},
  docFileIcon: {},
  docTitle: {
    flexGrow: 1,
  },
  drawerDocs: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'absolute',
  },
  drawerPaperDocs: {
    width: drawerWidth,
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
  drawerHeaderDocs: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

export default function DrawerDocs({ openDocs, handleDocsDrawerClose }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
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
      <ListItem>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText className={classes.docFolder} primary="Private" />
      </ListItem>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><DescriptionRoundedIcon className={classes.docFileIcon} /></ListItemIcon>
            <ListItemText className={classes.docFileName} secondary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem>
        <ListItemIcon>
          <FolderSharedRoundedIcon />
        </ListItemIcon>
        <ListItemText className={classes.docFolder} primary="Public" />
      </ListItem>
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><DescriptionRoundedIcon className={classes.docFileIcon} /></ListItemIcon>
            <ListItemText className={classes.docFileName} secondary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
