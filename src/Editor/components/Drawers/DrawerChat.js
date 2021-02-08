
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChatList from './ChatList';
import ChatInput from './ChatInput';

import config from '../../../config';

import { messages } from '../../data/messages.js'

const drawerWidth = config.editor.drawerWidth;

const useStyles = makeStyles((theme) => ({
  drawerChat: {
    flexShrink: 0,
    zIndex: 900,
  },
  drawerPaperChat: {
    width: drawerWidth,
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
    console.log('Send Message: ', inputValue);
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
