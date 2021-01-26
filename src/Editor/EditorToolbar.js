import React, { useState } from "react";
import { IconButton, ButtonGroup, Tooltip, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import Crop75Icon from "@material-ui/icons/Crop75";
import TimelineIcon from "@material-ui/icons/Timeline";
import UndoIcon from "@material-ui/icons/Undo";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import DashboardIcon from "@material-ui/icons/Dashboard";
import RedoIcon from "@material-ui/icons/Redo";
import "./editor.css";
import Svg1 from "../screenblocks/page-01.svg";
import Svg2 from "../screenblocks/page-02.svg";
import Svg3 from "../screenblocks/page-03.svg";
import Svg4 from "../screenblocks/page-04.svg";
import Svg5 from "../screenblocks/page-05.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    bottom: "10px",
    position: "absolute",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  toolbarGroup: {
    background: "#FFF",
    border: "1px solid darkgrey",
    padding: "4px",
  },
  screenBlockGroup: {
    background: "#FFF",
    border: "1px solid darkgrey",
    padding: "4px",
    display: "block",
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
}));

export default function EditorToolbar(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const createElement = (type) => {
    setOpen(false);
    props.addNode(type);
  };

  return (
    <div className={classes.root}>
      {open && (
        <ButtonGroup
          className={classes.screenBlockGroup}
          variant="outlined"
          color="default"
        >
            <IconButton
              size="small"
              onClick={() => createElement('ScreenBlockNode')}
            >
              <div className="svgIcons">
                <img src={Svg1} />
              </div>
            </IconButton>
          <IconButton
            size="small"
            onClick={() => createElement('ScreenBlockNode')}
          >
            <div className="svgIcons">
              <img src={Svg2} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => createElement('ScreenBlockNode')}
          >
            <div className="svgIcons">
              <img src={Svg3} />
            </div>
          </IconButton>
          
        </ButtonGroup>
      )}

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
            onClick={() => createElement("ShapeNode")}
          >
            <CheckBoxOutlineBlankIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Decision Node">
          <IconButton
            size="small"
            onClick={() => createElement("default", "decision")}
          >
            <ChangeHistoryIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Terminator Node">
          <IconButton
            size="small"
            onClick={() => createElement("default", "terminator")}
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
        <IconButton className={classes.annotation}>
          <img src="./annotations/check-circle.svg" />
        </IconButton>
        <IconButton className={classes.annotation}>
          <img src="./annotations/times-circle.svg" />
        </IconButton>
        <IconButton className={classes.annotation}>
          <img src="./annotations/info-circle.svg" />
        </IconButton>
        <IconButton className={classes.annotation} id="border3">
          <img src="./annotations/question-circle.svg" />
        </IconButton>

        {/* Create Arrow Button */}
        <Tooltip title="Custom Handle">
          <IconButton size="small">
            <TimelineIcon />
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
  );
}
