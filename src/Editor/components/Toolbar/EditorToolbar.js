import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, ButtonGroup, Tooltip} from "@material-ui/core";
import Crop75Icon from "@material-ui/icons/Crop75";
import UndoIcon from "@material-ui/icons/Undo";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import DashboardIcon from "@material-ui/icons/Dashboard";
import RedoIcon from "@material-ui/icons/Redo";
import TouchAppIcon from '@material-ui/icons/TouchApp';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import "../../style/editor.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    bottom: "10px",
    position: "absolute",
    alignItems: "center",
    pointerEvents: 'none',
    "& > *": {
      margin: theme.spacing(1),
      pointerEvents: 'auto',
    },
  },
  toolbarGroup: {
    background: "#FFF",
    border: "1px solid darkgrey",
    padding: "4px",
  },
  undoGroup: {
    border: "1px solid darkgrey",
    padding: "4px",
    backgroundColor: "darkgrey",
  },
  annotation: {
    padding: "0px",
  },
  border: {
    borderRight: "2px solid darkgrey",
    borderRightColor: "darkgrey",
  },
  screenblockbuttons: {
    minWidth: '20px',
  },
  sbmenu: {
    width: '100vw',
    zIndex: 10,
    bottom: "70px",
    position: "absolute",
    display: 'flex',
    justifyContent: 'center',
  },
  screenBlockGroup: {
    background: "#FFF",
    border: "1px solid darkgrey",
    padding: "4px",
    display: "block",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: '311px',
  },
}));

export default function EditorToolbar(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const createElement = (type, customData) => {
    setOpen(false);
    props.addNode(type, customData);
  };

  const screenBlockButtons = [];

  for (let i = 1; i < 121; i++) {
    let icon = i < 10 ? `/screenblocks/page-0${i}.svg` : `/screenblocks/page-${i}.svg`
    screenBlockButtons.push(
    <IconButton
      key={i}
      className={classes.screenblockbuttons}
      size="small"
      onClick={() => createElement('ScreenBlockNode', {screenBlockID: `${i}`})}
    >
      <img src={icon} width="20" height="20"/>
    </IconButton>)
  }
  return (
    <div >
      <div className={classes.root}>
      {/* ~~~~~EDITOR TOOLBAR~~~~~ */}
      <ButtonGroup
        className={classes.toolbarGroup}
        variant="outlined"
        color="default"
      >
        {/* Shape Node Buttons */}
        <Tooltip title="Block Node">
          <IconButton
            size="small"
            onClick={() => createElement("ShapeNode", {fillColor: 'dark', fillStyle: 'filled', shape: 'block'})}
          >
            <CheckBoxOutlineBlankIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Decision Node">
          <IconButton
            size="small"
            onClick={() => createElement("ShapeNode", {fillColor: 'dark', fillStyle: 'filled', shape: 'decision'})}
          >
            <RadioButtonUncheckedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Terminator Node">
          <IconButton
            size="small"
            onClick={() => createElement("ShapeNode", {fillColor: 'dark', fillStyle: 'filled', shape: 'term'})}
            id="border1"
          >
            <Crop75Icon />
          </IconButton>
        </Tooltip>

        {/* ScreenBlock Button */}
        <Tooltip title="Screenblocks">
          <IconButton size="small" onClick={handleOpen} id="border2">
            <DashboardIcon />
          </IconButton>
        </Tooltip>

        {/* Annotation Buttons */}
        <IconButton
          className={classes.annotation}
          onClick={() => createElement("AnnotationNode", {annotation: 'check'})}
        >
          <img src="./annotations/check-circle.svg" />
        </IconButton>
        <IconButton
         className={classes.annotation}
         onClick={() => createElement("AnnotationNode", {annotation: 'times'})}
         >
          <img src="./annotations/times-circle.svg" />
        </IconButton>
        <IconButton
         className={classes.annotation}
         onClick={() => createElement("AnnotationNode", {annotation: 'info'})}
         >
          <img src="./annotations/info-circle.svg" />
        </IconButton>
        <IconButton
         className={classes.annotation} id="border3"
         onClick={() => createElement("AnnotationNode", {annotation: 'question'})}
         >
          <img src="./annotations/question-circle.svg" />
        </IconButton>

        {/* Create Handle Node Button */}
        <Tooltip title="Handle Node">
          <IconButton
            size="small"
            onClick={() => createElement("HandleNode", {fillColor: 'dark', fillStyle: 'filled'})}
          >
            <TouchAppIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>

      {/* Undo Redo Buttons */}
      <ButtonGroup className={classes.toolbarGroup}>
        <Tooltip title="Undo">
          <IconButton
            size="small"
            onClick={() => createElement("default", "decision")}
          >
            <UndoIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Redo">
          <IconButton
            size="small"
            onClick={() => createElement("default", "terminator")}
          >
            <RedoIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </div>
    <div className={classes.sbmenu}>
      {/* ScreenBlocks Menu */}
      {open && (
        <ButtonGroup
          className={classes.screenBlockGroup}
          variant="outlined"
          color="default"
        >
         {screenBlockButtons}
        </ButtonGroup>
      )}
    </div>
  </div>
  );
}
