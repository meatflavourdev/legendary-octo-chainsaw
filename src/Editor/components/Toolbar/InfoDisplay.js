import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  infoDisplay: {
    position: 'absolute',
    bottom: '18px',
    left: '2em',
    background: '#FFF',
    border: '1px solid darkgrey',
    padding: '4px 1em',
    borderRadius: '0.5em',
    zIndex: 10,
    minWidth: '10em',
  },
  coordText: {
    lineHeight: '30px',
  },
}));

export default function EditorToolbar(props) {
  const classes = useStyles();

  return (
      <Paper className={classes.infoDisplay} elevation={0}>
      <Typography className={classes.coordText} variant="overline" display="block">
          <strong>px:</strong> 2346, 1300
        </Typography>
      <Typography className={classes.coordText} variant="overline" display="block">
          <strong>rf:</strong> 2664, 1600
        </Typography>
      </Paper>
  );
}
