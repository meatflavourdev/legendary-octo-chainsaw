
import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChatList from './ChatList';
import ChatInput from './ChatInput';

import { useAuth } from '../../../contexts/AuthContext';

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

  const { currentUser } = useAuth();

  const [messages, setMessages] = useState([]);

  const chatListBottomRef = useRef(null);

  React.useEffect(() => {
    if (wsSync) {
      console.log(`Getting messages YArray`);
      const messagesYArray = yDoc.current.getArray("messages");
      setMessages(messagesYArray.toJSON());
      // Update state on changes to Yjs elements Array
      messagesYArray.observe(() => {
        setMessages(messagesYArray.toJSON());
      });
    };
    if (!wsSync) {
      // Set the elements array to empty while loading elements from server
      console.log(`Resetting messages yArray`);
      setMessages([]);
    }
  }, [yDoc, wsSync]);

  const submitMessage = function (inputValue) {
    if (!inputValue) return;
    const messagesYArray = yDoc.current.getArray("messages");
    const newMessage = {
      user: {
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        uid: currentUser.uid,
      },
      message: inputValue,
      creationTime: new Date().getTime(),
    };
    wsSync && messagesYArray.push([newMessage]);
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
      <ChatList messages={messages} chatListBottomRef={chatListBottomRef} />
      <ChatInput submitMessage={submitMessage} />
  </Drawer>
  );
};
