
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

export default function DrawerDocs({ openChat, wsSync, yDoc, awareness }) {
  const classes = useStyles();

  const { currentUser } = useAuth();
  const currentUserArr = {
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL,
    uid: currentUser.uid,
  };

  const chatListBottomRef = useRef(null);

  const [messages, setMessages] = useState([]);
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

    // Add current user data to awareness and get awareness state
/*     const [awarenessState, setAwarenessState] = useState([]);
    React.useEffect(() => {
      if (wsSync) {
        console.log('Setting awareness local state', currentUserArr);
        awareness.current.setLocalState({
          user: currentUserArr
        });
        const awarenessMap = awareness.current.getStates();
        console.log('Getting local and remote awareness state', awarenessMap)
        setAwarenessState(awarenessMap.entries());
        // Handle awareness changes and update awarenessState
        awareness.current.on('change', () => {
          const awarenessMap = awareness.current.getStates();
          setAwarenessState(awarenessMap.entries());
          console.log('Awareness state changed:', awarenessState)
        });
      };
      if (!wsSync) {
        // Set the elements array to empty while loading elements from server
        console.log('Resetting awarenessState');
        setAwarenessState([]);
      }
    }, [yDoc, wsSync]); */

  const submitMessage = function (inputValue) {
    if (!inputValue) return;
    const messagesYArray = yDoc.current.getArray("messages");
    const newMessage = {
      user: currentUserArr,
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
