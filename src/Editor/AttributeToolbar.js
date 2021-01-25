import React, { useState } from 'react';
import { IconButton, ButtonGroup, Tooltip, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TitleIcon from '@material-ui/icons/Title';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import StopIcon from '@material-ui/icons/Stop';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import BorderClearIcon from '@material-ui/icons/BorderClear';
import BorderStyleIcon from '@material-ui/icons/BorderStyle';
import './editor.css'; 

const useStyles = makeStyles((theme) => ({
  root: {
    height: '200px',
    zIndex: 10,
    display: 'flex',
    top: '130px',
    position: 'absolute',
    alignItems: 'center',
    '& > *': {
      marginLeft: theme.spacing(3),
    },
  },
  toolbarGroup: {
    background: '#FFF',
    border: '1px solid darkgrey',
    padding: '4px',
  },
  attributeGroup: {
    paddingTop: '5px',
  }
}));

export default function AttributeToolbar(props) {
  const classes = useStyles();
  const [menu, setMenu] = React.useState('');
  const [open, setOpen] = React.useState(false);
  
  
  const handleOpen = (menu) => {
    setMenu(menu);
    setOpen(true);
  };
  

 
  const handleClose = () => {
    setOpen(false);
  }



  return (

    <div className={classes.root}>

        {/* <Tooltip title="Create Node">
          <IconButton size='small' onClick={handleOpen} >
          {open?<ButtonGroup className={classes.group2} disableElevation variant="outlined" color="default"></ButtonGroup>:null}
          <DashboardIcon/>
        </IconButton> */}
        
      {/* Attribute Toolbar */}
      <ButtonGroup className={classes.toolbarGroup} orientation="vertical" disableElevation variant="outlined" color="default">
        <Tooltip title="Change Color" placement="right">
          <IconButton className={classes.attributeGroup} size='small' onClick={() => handleOpen('color')}>
            <ColorLensOutlinedIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Fill Style" placement="right">
          <IconButton className={classes.attributeGroup} size='small' onClick={() => handleOpen('fill')}>
            <BorderStyleIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Change Text" placement="right">
          <IconButton className={classes.attributeGroup} size='small' onClick={() => handleClose('default', 'terminator')}>
            <TitleIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Text Size" placement="right">
          <IconButton className={classes.attributeGroup} size='small' onClick={() => handleClose('default', 'screenblock')}>
            <FormatSizeIcon/>
          </IconButton>
        </Tooltip>
      </ButtonGroup>

      {/* Color picker */}
      {open && menu === 'color' && <ButtonGroup id='colorPanel' className={classes.toolbarGroup} orientation="vertical" disableElevation variant="outlined" color="default">
        <IconButton size='small' onClick={() => { handleClose() 
          props.color('#595a66')}}>
          <FiberManualRecordIcon className="dark"/>
        </IconButton>
        <IconButton size='small' onClick={() => { handleClose() 
          props.color('#949aa1')}}>
          <FiberManualRecordIcon className="light"/>
        </IconButton>
        <IconButton size='small' onClick={() => { handleClose() 
          props.color('#ff426e')}}>
          <FiberManualRecordIcon className="red"/>
        </IconButton>
        <IconButton size='small' onClick={handleClose}>
          <FiberManualRecordIcon className="green"/>
        </IconButton>
        <IconButton size='small' onClick={handleClose}>
          <FiberManualRecordIcon className="blue"/>
        </IconButton>
        <IconButton size='small' onClick={handleClose}>
          <FiberManualRecordIcon className="darkblue"/>
        </IconButton>
      </ButtonGroup> }

      {/* Fill Style */}
      {open && menu === 'fill' && <ButtonGroup id='fillPanel' className={classes.toolbarGroup} orientation="vertical" disableElevation variant="outlined" color="default">
        <Tooltip title="Dotted Edge" placement="right">
          <IconButton size='small' onClick={() => { handleClose() 
          props.fillStyle('dotted')}}>
            <BorderClearIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Filled" placement="right">
          <IconButton size='small' onClick={() => { handleClose() 
          props.fillStyle('filled')}}>
            <StopIcon fontSize='large'/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Outlined" placement="right">
          <IconButton size='small' onClick={() => { handleClose() 
          props.fillStyle('outlined')}}>
            <CheckBoxOutlineBlankIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup> }
    </div>
  );
}
