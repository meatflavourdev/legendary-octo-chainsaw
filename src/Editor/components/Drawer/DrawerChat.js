
import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChatList from './ChatList';
import ChatInput from './ChatInput';

import { useAuth } from '../../../contexts/AuthContext';

import config from '../../../config';

const uuid62 = require("uuid62");

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

export default function DrawerChat({ reactFlowInstance, openChat, wsSync, yDoc, awareness }) {
  const classes = useStyles();

  const { currentUser } = useAuth();
  const currentUserArr = {
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL,
    uid: currentUser.uid,
    collabColor: currentUser.collabColor,
  };

  const chatListBottomRef = useRef(null);

  const [messages, setMessages] = useState([]);
  React.useEffect(() => {
    if (wsSync) {
      //console.log(`Getting messages YArray`);
      const messagesYArray = yDoc.current.getArray("messages");
      setMessages(messagesYArray.toJSON());
      // Update state on changes to Yjs elements Array
      messagesYArray.observe(() => {
        setMessages(messagesYArray.toJSON());
      });
    };
    if (!wsSync) {
      // Set the elements array to empty while loading elements from server
      //console.log(`Resetting messages yArray`);
      setMessages([]);
    }
  }, [yDoc, wsSync]);

  const submitMessage = function (inputValue) {
    if (!inputValue) return;
    const messagesYArray = yDoc.current.getArray("messages");
    const newMessage = {
      type: 'message',
      id: uuid62.v4(),
      user: currentUserArr,
      message: inputValue,
      creationTime: new Date().getTime(),
    };
    wsSync && messagesYArray.push([newMessage]);
  };

  const submitLocation = function (inputPosition) {
    console.log(`submitLocation called, x: ${inputPosition[0]} y: ${inputPosition[1]}`);
    if (!inputPosition || inputPosition.length < 2) return;
    const messagesYArray = yDoc.current.getArray("messages");

    let messageArr = [
      'requests your attention',
      'needs you to take a look',
      'has something for you to see',
      'is working on something of note',
      'is calling you over',
      'wants you to check this out',
      'thinks you should see this',
      'needs your keen eye',
      'has flagged this location',
      'asks you to join',
    ];

    const newMessage = {
      type: 'location',
      id: uuid62.v4(),
      user: currentUserArr,
      position: inputPosition,
      message: messageArr[Math.floor(Math.random() * messageArr.length)],
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
      <ChatList reactFlowInstance={reactFlowInstance} messages={messages} chatListBottomRef={chatListBottomRef} />
      <ChatInput reactFlowInstance={reactFlowInstance} submitMessage={submitMessage} submitLocation={submitLocation} />
  </Drawer>
  );
};
