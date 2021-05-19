import React, { useEffect, useState } from 'react';
import clsx from  'clsx';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../../contexts/AuthContext';
import AvatarTooltip from '../Avatar/AvatarTooltip';

const ago = require('s-ago');

const useStyles = makeStyles((theme) => ({
  chatMessageList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    padding: 0,
    flexGrow: 1,
  },
  inline: {
    display: 'inline',
  },
  listDivider: {
    backgroundColor: '#e1e1e1',
    '&:first-child': {
      display: 'none',
    },

  },
  item: {
    paddingBottom: '1.75em',
    marginTop: '-1px',
    paddingLeft: '0.8em',
    paddingRight: '0.25em',
  },
  itemSelf: {
    borderLeft: '7px solid #795cfc',
    direction: 'rtl',
     '& span > span': {
      left: '0.9em',
      right: 'inherit',
    },
    '& div.MuiListItemAvatar-root': {
      minWidth: '56px',
      marginRight: '0',
     }
  },
  avatarRoot: {
    minWidth: '40px',
    marginRight: '0.65em',
    '& > *': {
      //border: '1.99px solid rgba(255, 255, 255, 1)',
      boxShadow: '1px 1px 6px rgba(0,0,0,0.22), 1px 2px 4px rgba(0,0,0,0.18)',
    },
  },
  messageTitle: {
    direction: 'ltr',
    '& .MuiTypography-body1': {
      fontWeight: '500',
      overflow: 'hidden',
      wordBreak: 'break-all',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': 1,
    },
  },
  messageBody: {
    marginTop: '-3px',
  },
  messageTime: {
    position: 'absolute',
    right: '0px',
    color: 'rgb(103 58 183 / 95%)',
    direction: 'ltr',
    paddingTop: '0.5em',
  },
  messageText: {
    display: 'inline-block',
    marginTop: '0',
    direction: 'ltr',
  },

}));


export default function ChatList({ messages, chatListBottomRef }) {

  const cssProps = { };
  const classes = useStyles(cssProps);

  const { currentUser, generateColor } = useAuth();

  // Scroll to bottom of chat list on change
  useEffect(() => {
    chatListBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatListBottomRef]);

  const chatMessages = [];

  for (const message of messages) {
    chatMessages.push(
      <Divider id={message.id + '-divider'} key={message.id + '-divider'} className={classes.listDivider} variant="inset" component="li" />
    )
    const collabColor = message.user.collabColor || generateColor(message.user.displayName + currentUser.lastSignInTime);
    chatMessages.push(
      <ListItem className={ clsx(classes.item, (currentUser.uid === message.user.uid) && classes.itemSelf ) } id={message.id + '-message'} key={message.id + '-message'} alignItems="flex-start">
        <ListItemAvatar className={classes.avatarRoot}>
          <AvatarTooltip collabColor={collabColor} key={message.id || `${message.user.uid}-${message.creationTime}`} title={message.user.displayName} placement="left" arrow={true}>
            <Avatar alt={message.user.displayName} style={{backgroundColor: collabColor.hex, color: collabColor.isLight ? '#000' : '#FFF' }}  src={message.user.photoURL} />
          </AvatarTooltip>
          </ListItemAvatar>
        <ListItemText
            className={classes.messageTitle}
            primary={message.user.displayName}
            secondary={
              <span className={classes.messageBody}>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.messageText}
                  color="textPrimary"
                >
                  {
                      message.message.replace(/\n\s*\n/g, '\n').trim().split("\n").map(function(item, idx) {
                          return (
                              <span key={idx}>
                                  {item}
                                  <br/>
                              </span>
                          )
                      })
                  }
                </Typography>
                <br/>
                <Typography
                  component="span"
                  variant="caption"
                  className={classes.messageTime}
                  color="textSecondary"
                >
                  {ago(new Date(message.creationTime))}
                </Typography>
              </span>
            }
        />
        </ListItem>
    )
  }
  return (
    <List id="chatMessageListScroller" className={classes.chatMessageList}>
      {chatMessages}
      <li key="bottom" ref={chatListBottomRef} />
    </List>
  );
}
