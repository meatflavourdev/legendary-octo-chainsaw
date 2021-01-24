import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import Crop75Icon from '@material-ui/icons/Crop75';
import BrushIcon from '@material-ui/icons/Brush';
import TimelineIcon from '@material-ui/icons/Timeline';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import Tooltip from '@material-ui/core/Tooltip';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Icon from '@material-ui/core/Icon'

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
  },
  annotation: {
    padding: '0px',
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
      {open && <ButtonGroup className={classes.group2} disableElevation variant="outlined" color="default">
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
      <ButtonGroup className={classes.group} disableElevation variant="outlined" color="default">
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
          <IconButton size='small' onClick={() => handleClose('default', 'terminator')}>
            <Crop75Icon/>
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
        <IconButton size='small'>
         <TextFormatIcon/>
        </IconButton>
        <IconButton size='small'>
         <TimelineIcon/>
        </IconButton>
      </ButtonGroup>
    </div>
  );
}
