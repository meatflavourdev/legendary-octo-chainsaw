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
    width: '95%',
    backgroundColor: 'white',
  },
  chatForm: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    bottom: '15px',
    paddingTop: '0.5em',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: '#f6f6f6',
  }
}));

function useTextFieldInput(id, className, label, variant, defaultVal = '', multiline = true ) {
  const [value, setValue] = useState(defaultVal);
  const input = <TextField id={id} className={className} label={label} variant={variant} multiline={multiline} value={value} onChange={(e) => setValue(e.target.value)} />;
  return [value, input];
}

export default function BasicTextFields({ submitMessage }) {
  const classes = useStyles();

  // State for the chat text input
  const [inputValue, setInputValue] = useState('');

  const handleSendClick = () => {
    console.log('handleSendClick called', inputValue);
    submitMessage(inputValue);
    setInputValue('');
  };

  function submitOnEnter(e){
    if(e.which === 13 && !e.shiftKey){
      console.log('inputValue: ', inputValue);
    }
  }

  React.useEffect(() => {
    document.getElementById("chatForm").addEventListener("keypress", submitOnEnter);
  });

  return (
    <form id="chatForm" className={classes.chatForm} onSubmit={(e) => {
      e.preventDefault();
      handleSendClick();
    }} noValidate>
      <TextField
        className={classes.textfield}
        id="outlined-basic"
        label="Got something to say?"
        variant="outlined"
        multiline={true}
        value={inputValue}
        onChange={handleChange}
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
