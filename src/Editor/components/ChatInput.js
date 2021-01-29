import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

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
    position: 'absolute',
    bottom: '15px'

  }
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.chatForm} noValidate autoComplete="off">
      <TextField className={classes.textfield} id="outlined-basic" label="Got something to say?" variant="outlined" />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendRoundedIcon>send</SendRoundedIcon>}
      >
        Send
      </Button>
    </form>
  );
}
