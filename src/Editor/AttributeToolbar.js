import React, { useState } from 'react';
import { IconButton, ButtonGroup, Tooltip, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TitleIcon from '@material-ui/icons/Title';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import StopIcon from '@material-ui/icons/Stop';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import BorderClearIcon from '@material-ui/icons/BorderClear';
import BorderStyleIcon from '@material-ui/icons/BorderStyle';
import { useStoreState } from 'react-flow-renderer';
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
  },
  nodetext: {
    zIndex: 10,
    postition: 'absolute',
    top:'50px',
    width: '100px'
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
  

  const selectedElements = useStoreState(store => store.selectedElements);

  const handleUpdateNodeData = (dataObj) => {
    setOpen(false);
    console.log('selectedElements:', selectedElements);
    if (selectedElements && selectedElements.length > 0) {
      for (const element of selectedElements) {
        props.setEls((els) =>
            els.map((el) => {
              if (el.id === element.id && ['ShapeNode', 'HandleNode'].includes(el.type)) {
                el.data = {
                  ...el.data,
                  ...dataObj,
                };
              }
              return el;
            })
          );
      }

    }
  }

  
  return (

    <div className={classes.root}>

      <ButtonGroup className={classes.toolbarGroup} orientation="vertical" variant="outlined" color="default">
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
          <IconButton className={classes.attributeGroup} size='small' onClick={() => handleOpen('text')}>
            <TitleIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Text Size" placement="right">
          <IconButton className={classes.attributeGroup} size='small' onClick={() => handleUpdateNodeData('default', 'screenblock')}>
            <FormatSizeIcon/>
          </IconButton>
        </Tooltip>
      </ButtonGroup>

      {/* Color picker */}
      {open && menu === 'color' && <ButtonGroup id='colorPanel' className={classes.toolbarGroup} orientation="vertical" variant="outlined" color="default">
        <IconButton size='small' onClick={() => handleUpdateNodeData({fillColor:'dark'})}>
          <FiberManualRecordIcon className="dark"/>
        </IconButton>
        <IconButton size='small' onClick={() => handleUpdateNodeData({fillColor:'light'})}>
          <FiberManualRecordIcon className="light"/>
        </IconButton>
        <IconButton size='small' onClick={() => handleUpdateNodeData({fillColor:'red'})}>
          <FiberManualRecordIcon className="red"/>
        </IconButton>
        <IconButton size='small' onClick={() => handleUpdateNodeData({fillColor:'green'})}>
          <FiberManualRecordIcon className="green"/>
        </IconButton>
        <IconButton size='small' onClick={() => handleUpdateNodeData({fillColor:'blue'})}>
          <FiberManualRecordIcon className="blue"/>
        </IconButton>
        <IconButton size='small' onClick={() => handleUpdateNodeData({fillColor:'purple'})}>
          <FiberManualRecordIcon className="darkblue"/>
        </IconButton>
      </ButtonGroup> }

      {/* Fill Style */}
      {open && menu === 'fill' && <ButtonGroup id='fillPanel' className={classes.toolbarGroup} orientation="vertical" variant="outlined" color="default">
        <Tooltip title="Dotted Edge" placement="right">
          <IconButton size='small' onClick={() => handleUpdateNodeData({fillStyle: 'dashed'})}>
            <BorderClearIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Filled" placement="right">
          <IconButton size='small' onClick={() => handleUpdateNodeData({fillStyle: 'filled'})}>
            <StopIcon fontSize='large'/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Outlined" placement="right">
          <IconButton size='small' onClick={() => handleUpdateNodeData({fillStyle: 'outlined'})}>
            <CheckBoxOutlineBlankIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup> }

      {open && menu === 'text' && <TextField onKeyPress={(e) => {
            if (e.key === 'Enter') {
              console.log('Enter key pressed');
              handleUpdateNodeData({label: 'hello'})
            }
    }} className={classes.nodetext} id="outlined-basic" multiline label="Label" variant="outlined" />}
    </div>
  );
}
