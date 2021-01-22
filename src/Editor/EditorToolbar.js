import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import BrushIcon from '@material-ui/icons/Brush';
import TimelineIcon from '@material-ui/icons/Timeline';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import Tooltip from '@material-ui/core/Tooltip';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DashboardIcon from '@material-ui/icons/Dashboard';


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
  },
  group2: {
    border: '1px solid darkgrey',
    padding: '4px',
    backgroundColor: 'darkgrey'
  }
}));

export default function EditorToolbar(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  
  
  const handleOpen = () => {
    setOpen(!open);
  };

 
  const handleClose = () => {
    setOpen(false);
    props.addNode();
  }
  


  return (
    <div className={classes.root}>
      {open && <ButtonGroup className={classes.group2} disableElevation variant="outlined" color="default">
      <Tooltip title="Block Node">
        <IconButton size='small' onClick={handleClose}>
          <CheckBoxOutlineBlankIcon/>
        </IconButton>
      </Tooltip>
        <IconButton size='small'>
          <EditIcon/>
        </IconButton>
        <IconButton size='small'>
          <BrushIcon/>
        </IconButton>
      </ButtonGroup> }
      <ButtonGroup className={classes.group} disableElevation variant="outlined" color="default">
      <Tooltip title="Create Node">
        <IconButton size='small' onClick={handleOpen} >
        {open?<ButtonGroup className={classes.group2} disableElevation variant="outlined" color="default"></ButtonGroup>:null}
          <DashboardIcon/>
        </IconButton>
      </Tooltip>
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
