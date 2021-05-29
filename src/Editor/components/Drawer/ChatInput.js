import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(1),
    width: '95%',
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
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  buttonLocation: {
    maxWidth: '3em',
    minWidth: '2.5em',
    '& span': {
      width: '20px',
    },
  },
  buttonSend: {
    marginLeft: 0,
  },
  buttonLocationIcon: {
    width: '20px',
    height: '20px',
    padding: '0',
  },
}));

// Defines the multiline text input
function useTextFieldInput(id, className, label, variant, onKeyUp, defaultVal = '', multiline = true) {
  const [value, setValue] = useState(defaultVal);
  const input = (
    <TextField
      id={id}
      className={className}
      label={label}
      variant={variant}
      multiline={multiline}
      value={value}
      onKeyUp={onKeyUp}
      onChange={(e) => setValue(e.target.value)}
    />
  );
  return [value, setValue, input];
}

export default function ChatInput({ reactFlowInstance, submitMessage, submitLocation }) {
  const classes = useStyles();

  function handleKeypress(e) {
    e.preventDefault();
    if (e.which === 13 && !e.shiftKey) {
      handleSendClick();
    }
  }

  // State for the chat text input
  const [value, setValue, input] = useTextFieldInput(
    'outlined-basic',
    classes.textfield,
    'Got something to say?',
    'outlined',
    handleKeypress
  );

  const handleSendClick = () => {
    //console.log('handleSendClick called', value);
    submitMessage(value.replace(/\n\s*\n/g, '\n').trim());
    setValue('');
  };

  const handleLocationClick = () => {
    console.log('handleLocationClick called');
    // If the instance reference isn't defined yet, ignore the button press
    // TODO: Gracefully handle this error(?)
    if (!reactFlowInstance.current) return;
    const currentInstance = reactFlowInstance.current.toObject();
    submitLocation(currentInstance.position);
    // Create function to record new message type
  };

  return (
    <form
      id="chatForm"
      className={classes.chatForm}
      onSubmit={(e) => {
        e.preventDefault();
        handleSendClick();
      }}
      noValidate
    >
      {input}
      <div className={classes.buttonContainer}>
      <Tooltip title="Send Location" placement="top" enterDelay={500} leaveDelay={200}>
        <Button variant="contained" color="primary" className={`${classes.button} ${classes.buttonLocation}`} onClick={handleLocationClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={classes.buttonLocationIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          </Button>
          </Tooltip>
        <Button
          variant="contained"
          color="primary"
          className={`${classes.button} ${classes.buttonSend}`}
          onClick={handleSendClick}
          endIcon={<SendRoundedIcon>send</SendRoundedIcon>}
        >
          Send
        </Button>
      </div>
    </form>
  );
}
