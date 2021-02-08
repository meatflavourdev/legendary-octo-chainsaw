import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(1),
    width: '95%'
  },
  textfield: {
    width:'95%'
  },
  chatForm: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    bottom: '15px',
    paddingTop: '0.5em',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
  }
}));

export default function BasicTextFields({ submitMessage }) {
  const classes = useStyles();

  // State for the chat text input
  const [inputValue, setInputValue] = useState('');

  const handleSendClick = () => {
    submitMessage(inputValue);
    setInputValue('');
  };

  return (
    <form className={classes.chatForm} onSubmit={(e) => e.preventDefault()} noValidate>
      <TextField
        className={classes.textfield}
        id="outlined-basic"
        label="Got something to say?"
        variant="outlined"
        multiline
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSendClick}
        endIcon={<SendRoundedIcon>send</SendRoundedIcon>}
      >
        Send
      </Button>
    </form>
  );
}
