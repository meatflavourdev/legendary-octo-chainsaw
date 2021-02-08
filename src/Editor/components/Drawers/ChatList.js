import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
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
    }
  }
}));


export default function ChatList({ messages }) {
  const classes = useStyles();

  const chatMessages = [];

  for (const message of messages) {
    chatMessages.push(
      <Divider className={classes.listDivider} variant="inset" component="li" />
    )
    chatMessages.push(
      <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={message.user.photoURL} />
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
    <List className={classes.root}>
      {chatMessages}
    </List>
  );
}
