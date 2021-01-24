import React, { useState } from 'react';
import { IconButton, ButtonGroup, Tooltip, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import Crop75Icon from '@material-ui/icons/Crop75';
import TimelineIcon from '@material-ui/icons/Timeline';
import UndoIcon from '@material-ui/icons/Undo';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DashboardIcon from '@material-ui/icons/Dashboard';
import RedoIcon from '@material-ui/icons/Redo';
import './editor.css'; 

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    bottom: '10px',
    position: 'absolute',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  toolbarGroup: {
    background: '#FFF',
    border: '1px solid darkgrey',
    padding: '4px',
  },
  undoGroup: {
    border: '1px solid darkgrey',
    padding: '4px',
    backgroundColor: 'darkgrey'
  },
  annotation: {
    padding: '0px',
  },
  border: {
    borderRight: '2px solid darkgrey',
    borderRightColor: 'darkgrey'
  }
}));

export default function EditorToolbar(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);


  const handleOpen = () => {
    setOpen(!open);
  };


  const handleClose = (type, shape) => {
    setOpen(false);
    props.addNode(type, shape);
  }



  return (

    <div className={classes.root}>
      {open && <ButtonGroup className={classes.toolbarGroup} disableElevation variant="outlined" color="default">
      <Tooltip title="Block Node">
        <IconButton size='small' onClick={() => handleClose('default', 'block')}>
          <CheckBoxOutlineBlankIcon/>
        </IconButton>
      </Tooltip>
        <IconButton size='small' onClick={() => handleClose('default', 'decision')}>
          <ChangeHistoryIcon/>
        </IconButton>
        <IconButton size='small' onClick={() => handleClose('default', 'terminator')}>
          <Crop75Icon/>
        </IconButton>
      </ButtonGroup> }

        {/* <Tooltip title="Create Node">
          <IconButton size='small' onClick={handleOpen} >
          {open?<ButtonGroup className={classes.group2} disableElevation variant="outlined" color="default"></ButtonGroup>:null}
          <DashboardIcon/>
        </IconButton> */}
      <ButtonGroup className={classes.toolbarGroup} disableElevation variant="outlined" color="default">
        <Tooltip title="Block Node">
          <IconButton size='small' onClick={() => handleClose('default', 'block')}>
            <CheckBoxOutlineBlankIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Decision Node">
          <IconButton size='small' onClick={() => handleClose('default', 'decision')}>
            <ChangeHistoryIcon/>
        </IconButton>
        </Tooltip>
        <Tooltip title="Terminator Node">
          <IconButton size='small' onClick={() => handleClose('default', 'terminator')} id='border1'>
            <Crop75Icon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Screenblocks">
          <IconButton size='small' onClick={() => handleClose('default', 'screenblock')} id='border2'>
            <DashboardIcon/>
        </IconButton>
        </Tooltip>
        
        <IconButton className={classes.annotation}>
          <img src="./annotations/check-circle.svg"/>
        </IconButton>
        <IconButton className={classes.annotation}>
          <img src="./annotations/times-circle.svg"/>
        </IconButton>
        <IconButton className={classes.annotation}>
          <img src="./annotations/info-circle.svg"/>
        </IconButton>
        <IconButton className={classes.annotation} id='border3'>
          <img src="./annotations/question-circle.svg"/>
        </IconButton>
        <Tooltip title="Custom Handle">
          <IconButton size='small'>
          <TimelineIcon/>
          </IconButton>
        </Tooltip>
      </ButtonGroup>

      <ButtonGroup className={classes.toolbarGroup}>
        <Tooltip title="Undo">
          <IconButton size='small' onClick={() => handleClose('default', 'decision')}>
            <UndoIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Redo">
          <IconButton size='small' onClick={() => handleClose('default', 'terminator')}>
            <RedoIcon/>
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
}
