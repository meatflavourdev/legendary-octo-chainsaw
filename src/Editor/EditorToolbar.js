import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import BrushIcon from '@material-ui/icons/Brush';
import TimelineIcon from '@material-ui/icons/Timeline';
import TextFormatIcon from '@material-ui/icons/TextFormat';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    zIndex: 10,
    bottom: '10px',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  group: {
    border: '1px solid darkgrey',
    padding: '4px',
  }
}));

export default function EditorToolbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup className={classes.group} disableElevation variant="outlined" color="default">
        <IconButton size='small'>
          <AddCircleIcon/>
        </IconButton>
        <IconButton size='small'>
          <EditIcon/>
        </IconButton>
        <IconButton size='small'>
          <BrushIcon/>
        </IconButton>
        <IconButton size='small'>
          <TimelineIcon/>
        </IconButton>
        <IconButton size='small'>
         <TextFormatIcon/>
        </IconButton>
      </ButtonGroup>
    </div>
  );
}