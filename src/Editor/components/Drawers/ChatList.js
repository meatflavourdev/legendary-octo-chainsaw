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
  }
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
    const collabColor = message.collabColor || generateColor(message.user.displayName, message.collabColor?.seed || '3qPMzsB5uk3P5Qf52Qmbsa');
    chatMessages.push(
      <ListItem key={message.creationTime + '-message'} alignItems="flex-start">
          <ListItemAvatar>
          <Avatar alt="Remy Sharp" style={{backgroundColor: collabColor.color, color: collabColor.isLight ? '#000' : '#FFF' }}  src={message.user.photoURL} />
          </ListItemAvatar>
          <ListItemText
            primary={message.user.displayName}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {/* Person or Linked Comment can go here */}
                </Typography>
                {message.message}
              </React.Fragment>
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
