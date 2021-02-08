
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChatList from './ChatList';
import ChatInput from './ChatInput';

import config from '../../../config';

const drawerWidth = config.editor.drawerWidth;

const useStyles = makeStyles((theme) => ({
  drawerChat: {
    flexShrink: 0,
    zIndex: 900,
  },
  drawerPaperChat: {
    width: drawerWidth,
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  drawerHeaderChat: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

export default function DrawerDocs({ openChat, yDoc, wsSync }) {
  const classes = useStyles();

  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    if (wsSync) {
      console.log(`Getting messages YArray`);
      const messagesYArray = yDoc.current.getArray("messages");
      setMessages(messagesYArray.toJSON());
      console.log('Messages: ', messages);
      // Update state on changes to Yjs elements Array
      messagesYArray.observe(() => {
        setMessages(messagesYArray.toJSON());
        console.log('Messages: ', messages);
      });
    };
    if (!wsSync) {
      // Set the elements array to empty while loading elements from server
      console.log(`Resetting messages yArray`);
      setMessages([]);
      console.log('Messages: ', messages);
    }
  }, [yDoc, wsSync]);

  const submitMessage = function (inputValue) {
    const messagesYArray = yDoc.current.getArray("messages");
    const newMessage = {
      user: {
        displayName: "Jeremy Felix D.",
        photoURL: "https://lh3.googleusercontent.com/a-/AOh14GgbynPUuv0Ejt3hiHulz0rxtn5DtY8BiWQKXqdhhLM=s96-c",
        uid: "fqBjpB7hBGN1cME5G95garsEfqM2"
      },
      message: inputValue,
      creationTime: 1611741946,
      isUnread: true
    };
    messagesYArray.push([newMessage]);
    console.log('Send Message: ', newMessage);
  };

  return (
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
      <ChatList messages={messages} />
      <ChatInput submitMessage={submitMessage} />
  </Drawer>
  );
};
