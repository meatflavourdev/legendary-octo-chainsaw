import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../../contexts/AuthContext';

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
    '&:first-child': {
      display: 'none',
    },
    margin: 0,
  },
  messageBody: {
    marginTop: '-3px',
  },
  messageTime: {
    display: 'inline-block',
    marginBottom: '3px',
  },
  messageText: {
    display: 'inline-block',
    marginTop: '0',
  },

}));


export default function ChatList({ messages, chatListBottomRef }) {
  const classes = useStyles();

  const { generateColor } = useAuth();

  // Scroll to bottom of chat list on change
  useEffect(() => {
    chatListBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatListBottomRef]);

  const chatMessages = [];

  for (const message of messages) {
    chatMessages.push(
      <Divider key={message.creationTime + '-divider'} className={classes.listDivider} variant="inset" component="li" />
    )
    chatMessages.push(
      <ListItem key={message.creationTime + '-message'} alignItems="flex-start">
          <ListItemAvatar>
          <Avatar alt={message.user.displayName} style={{backgroundColor: message.user.collabColor.color, color: message.user.collabColor.isLight ? '#000' : '#FFF' }}  src={message.user.photoURL} />
          </ListItemAvatar>
        <ListItemText
            primary={message.user.displayName}
            secondary={
              <span className={classes.messageBody}>
                <Typography
                  component="span"
                  variant="caption"
                  className={classes.messageTime}
                  color="textSecondary"
                >
                  {ago(new Date(message.creationTime))}
                </Typography>
                <br/>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.messageText}
                  color="textPrimary"
                  >
                  {message.message}
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
