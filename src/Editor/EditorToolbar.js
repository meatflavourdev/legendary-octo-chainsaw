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
import Svg6 from "../screenblocks/page-06.svg";
import Svg7 from "../screenblocks/page-07.svg";
import Svg8 from "../screenblocks/page-08.svg";
import Svg9 from "../screenblocks/page-09.svg";
import Svg10 from "../screenblocks/page-10.svg";
import Svg11 from "../screenblocks/page-11.svg";
import Svg12 from "../screenblocks/page-12.svg";
import Svg13 from "../screenblocks/page-13.svg";
import Svg14 from "../screenblocks/page-14.svg";
import Svg15 from "../screenblocks/page-15.svg";
import Svg16 from "../screenblocks/page-16.svg";
import Svg17 from "../screenblocks/page-17.svg";
import Svg18 from "../screenblocks/page-18.svg";
import Svg19 from "../screenblocks/page-19.svg";
import Svg20 from "../screenblocks/page-20.svg";
import Svg21 from "../screenblocks/page-21.svg";
import Svg22 from "../screenblocks/page-22.svg";
import Svg23 from "../screenblocks/page-23.svg";
import Svg24 from "../screenblocks/page-24.svg";
import Svg25 from "../screenblocks/page-25.svg";
import Svg26 from "../screenblocks/page-26.svg";
import Svg27 from "../screenblocks/page-27.svg";
import Svg28 from "../screenblocks/page-28.svg";
import Svg29 from "../screenblocks/page-29.svg";
import Svg30 from "../screenblocks/page-30.svg";
import Svg31 from "../screenblocks/page-31.svg";
import Svg32 from "../screenblocks/page-32.svg";
import Svg33 from "../screenblocks/page-33.svg";
import Svg34 from "../screenblocks/page-34.svg";
import Svg35 from "../screenblocks/page-35.svg";
import Svg36 from "../screenblocks/page-36.svg";
import Svg37 from "../screenblocks/page-37.svg";
import Svg38 from "../screenblocks/page-38.svg";
import Svg39 from "../screenblocks/page-39.svg";
import Svg40 from "../screenblocks/page-40.svg";
import Svg41 from "../screenblocks/page-41.svg";
import Svg42 from "../screenblocks/page-42.svg";
import Svg43 from "../screenblocks/page-43.svg";
import Svg44 from "../screenblocks/page-44.svg";
import Svg45 from "../screenblocks/page-45.svg";
import Svg46 from "../screenblocks/page-46.svg";
import Svg47 from "../screenblocks/page-47.svg";
import Svg48 from "../screenblocks/page-48.svg";
import Svg49 from "../screenblocks/page-49.svg";
import Svg50 from "../screenblocks/page-50.svg";
import Svg51 from "../screenblocks/page-51.svg";
import Svg52 from "../screenblocks/page-52.svg";
import Svg53 from "../screenblocks/page-53.svg";
import Svg54 from "../screenblocks/page-54.svg";
import Svg55 from "../screenblocks/page-55.svg";
import Svg56 from "../screenblocks/page-56.svg";
import Svg57 from "../screenblocks/page-57.svg";
import Svg58 from "../screenblocks/page-58.svg";
import Svg59 from "../screenblocks/page-59.svg";
import Svg60 from "../screenblocks/page-60.svg";
import Svg61 from "../screenblocks/page-61.svg";
import Svg62 from "../screenblocks/page-62.svg";
import Svg63 from "../screenblocks/page-63.svg";
import Svg64 from "../screenblocks/page-64.svg";
import Svg65 from "../screenblocks/page-65.svg";
import Svg66 from "../screenblocks/page-66.svg";
import Svg67 from "../screenblocks/page-67.svg";
import Svg68 from "../screenblocks/page-68.svg";
import Svg69 from "../screenblocks/page-69.svg";
import Svg70 from "../screenblocks/page-70.svg";
import Svg71 from "../screenblocks/page-71.svg";
import Svg72 from "../screenblocks/page-72.svg";
import Svg73 from "../screenblocks/page-73.svg";
import Svg74 from "../screenblocks/page-74.svg";
import Svg75 from "../screenblocks/page-75.svg";
import Svg76 from "../screenblocks/page-76.svg";
import Svg77 from "../screenblocks/page-77.svg";
import Svg78 from "../screenblocks/page-78.svg";
import Svg79 from "../screenblocks/page-79.svg";
import Svg80 from "../screenblocks/page-80.svg";
import Svg81 from "../screenblocks/page-81.svg";
import Svg82 from "../screenblocks/page-82.svg";
import Svg83 from "../screenblocks/page-83.svg";
import Svg84 from "../screenblocks/page-84.svg";
import Svg85 from "../screenblocks/page-85.svg";
import Svg86 from "../screenblocks/page-86.svg";
import Svg87 from "../screenblocks/page-87.svg";
import Svg88 from "../screenblocks/page-88.svg";
import Svg89 from "../screenblocks/page-89.svg";
import Svg90 from "../screenblocks/page-90.svg";
import Svg91 from "../screenblocks/page-91.svg";
import Svg92 from "../screenblocks/page-92.svg";
import Svg93 from "../screenblocks/page-93.svg";
import Svg94 from "../screenblocks/page-94.svg";
import Svg95 from "../screenblocks/page-95.svg";
import Svg96 from "../screenblocks/page-96.svg";
import Svg97 from "../screenblocks/page-97.svg";
import Svg98 from "../screenblocks/page-98.svg";
import Svg99 from "../screenblocks/page-99.svg";
import Svg100 from "../screenblocks/page-100.svg";
import Svg101 from "../screenblocks/page-101.svg";
import Svg102 from "../screenblocks/page-102.svg";
import Svg103 from "../screenblocks/page-103.svg";
import Svg104 from "../screenblocks/page-104.svg";
import Svg105 from "../screenblocks/page-105.svg";
import Svg106 from "../screenblocks/page-106.svg";
import Svg107 from "../screenblocks/page-107.svg";
import Svg108 from "../screenblocks/page-108.svg";
import Svg109 from "../screenblocks/page-109.svg";
import Svg110 from "../screenblocks/page-110.svg";
import Svg111 from "../screenblocks/page-111.svg";
import Svg112 from "../screenblocks/page-112.svg";
import Svg113 from "../screenblocks/page-113.svg";
import Svg114 from "../screenblocks/page-114.svg";
import Svg115 from "../screenblocks/page-115.svg";
import Svg116 from "../screenblocks/page-116.svg";
import Svg117 from "../screenblocks/page-117.svg";
import Svg118 from "../screenblocks/page-118.svg";
import Svg119 from "../screenblocks/page-119.svg";
import Svg120 from "../screenblocks/page-120.svg";

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

  const handleClose = (type, shape) => {
    setOpen(false);
    props.addNode(type, shape);
  };

  return (
    <div className={classes.root}>
      {open && (
        <ButtonGroup
          className={classes.screenBlockGroup}
          disableElevation
          variant="outlined"
          color="default"
        >
          <Tooltip>
            <IconButton
              size="small"
              onClick={() => handleClose("default", "screenblock1")}
            >
              <div class="svgIcons">
                <img src={Svg1} />
              </div>
            </IconButton>
          </Tooltip>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock2")}
          >
            <div class="svgIcons">
              <img src={Svg2} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock3")}
          >
            <div class="svgIcons">
              <img src={Svg3} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock4")}
          >
            <div class="svgIcons">
              <img src={Svg4} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock5")}
          >
            <div class="svgIcons">
              <img src={Svg5} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock6")}
          >
            <div class="svgIcons">
              <img src={Svg6} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock7")}
          >
            <div class="svgIcons">
              <img src={Svg7} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock8")}
          >
            <div class="svgIcons">
              <img src={Svg8} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock9")}
          >
            <div class="svgIcons">
              <img src={Svg9} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock10")}
          >
            <div class="svgIcons">
              <img src={Svg10} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock11")}
          >
            <div class="svgIcons">
              <img src={Svg11} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock12")}
          >
            <div class="svgIcons">
              <img src={Svg12} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock13")}
          >
            <div class="svgIcons">
              <img src={Svg13} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock14")}
          >
            <div class="svgIcons">
              <img src={Svg14} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock15")}
          >
            <div class="svgIcons">
              <img src={Svg15} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock16")}
          >
            <div class="svgIcons">
              <img src={Svg16} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock17")}
          >
            <div class="svgIcons">
              <img src={Svg17} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock18")}
          >
            <div class="svgIcons">
              <img src={Svg18} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock19")}
          >
            <div class="svgIcons">
              <img src={Svg19} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock20")}
          >
            <div class="svgIcons">
              <img src={Svg20} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock21")}
          >
            <div class="svgIcons">
              <img src={Svg21} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock22")}
          >
            <div class="svgIcons">
              <img src={Svg22} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock23")}
          >
            <div class="svgIcons">
              <img src={Svg23} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock24")}
          >
            <div class="svgIcons">
              <img src={Svg24} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock25")}
          >
            <div class="svgIcons">
              <img src={Svg25} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock26")}
          >
            <div class="svgIcons">
              <img src={Svg26} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock27")}
          >
            <div class="svgIcons">
              <img src={Svg27} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock28")}
          >
            <div class="svgIcons">
              <img src={Svg28} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock29")}
          >
            <div class="svgIcons">
              <img src={Svg29} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock30")}
          >
            <div class="svgIcons">
              <img src={Svg30} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock31")}
          >
            <div class="svgIcons">
              <img src={Svg31} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock32")}
          >
            <div class="svgIcons">
              <img src={Svg32} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock33")}
          >
            <div class="svgIcons">
              <img src={Svg33} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock34")}
          >
            <div class="svgIcons">
              <img src={Svg34} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock35")}
          >
            <div class="svgIcons">
              <img src={Svg35} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock36")}
          >
            <div class="svgIcons">
              <img src={Svg36} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock37")}
          >
            <div class="svgIcons">
              <img src={Svg37} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock38")}
          >
            <div class="svgIcons">
              <img src={Svg38} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock39")}
          >
            <div class="svgIcons">
              <img src={Svg39} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock40")}
          >
            <div class="svgIcons">
              <img src={Svg40} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock41")}
          >
            <div class="svgIcons">
              <img src={Svg41} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock42")}
          >
            <div class="svgIcons">
              <img src={Svg42} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock43")}
          >
            <div class="svgIcons">
              <img src={Svg43} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock44")}
          >
            <div class="svgIcons">
              <img src={Svg44} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock45")}
          >
            <div class="svgIcons">
              <img src={Svg45} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock46")}
          >
            <div class="svgIcons">
              <img src={Svg46} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock47")}
          >
            <div class="svgIcons">
              <img src={Svg47} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock48")}
          >
            <div class="svgIcons">
              <img src={Svg48} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock49")}
          >
            <div class="svgIcons">
              <img src={Svg49} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock50")}
          >
            <div class="svgIcons">
              <img src={Svg50} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock51")}
          >
            <div class="svgIcons">
              <img src={Svg51} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock52")}
          >
            <div class="svgIcons">
              <img src={Svg52} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock53")}
          >
            <div class="svgIcons">
              <img src={Svg53} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock55")}
          >
            <div class="svgIcons">
              <img src={Svg55} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock56")}
          >
            <div class="svgIcons">
              <img src={Svg56} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock57")}
          >
            <div class="svgIcons">
              <img src={Svg57} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock58")}
          >
            <div class="svgIcons">
              <img src={Svg58} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock59")}
          >
            <div class="svgIcons">
              <img src={Svg59} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock60")}
          >
            <div class="svgIcons">
              <img src={Svg60} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock61")}
          >
            <div class="svgIcons">
              <img src={Svg61} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock62")}
          >
            <div class="svgIcons">
              <img src={Svg62} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock63")}
          >
            <div class="svgIcons">
              <img src={Svg63} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock64")}
          >
            <div class="svgIcons">
              <img src={Svg64} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock65")}
          >
            <div class="svgIcons">
              <img src={Svg65} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock66")}
          >
            <div class="svgIcons">
              <img src={Svg66} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock67")}
          >
            <div class="svgIcons">
              <img src={Svg67} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock68")}
          >
            <div class="svgIcons">
              <img src={Svg68} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock69")}
          >
            <div class="svgIcons">
              <img src={Svg69} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock70")}
          >
            <div class="svgIcons">
              <img src={Svg70} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock71")}
          >
            <div class="svgIcons">
              <img src={Svg71} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock72")}
          >
            <div class="svgIcons">
              <img src={Svg72} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock73")}
          >
            <div class="svgIcons">
              <img src={Svg73} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock74")}
          >
            <div class="svgIcons">
              <img src={Svg74} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock75")}
          >
            <div class="svgIcons">
              <img src={Svg75} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock76")}
          >
            <div class="svgIcons">
              <img src={Svg76} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock77")}
          >
            <div class="svgIcons">
              <img src={Svg77} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock78")}
          >
            <div class="svgIcons">
              <img src={Svg78} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock79")}
          >
            <div class="svgIcons">
              <img src={Svg79} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock80")}
          >
            <div class="svgIcons">
              <img src={Svg80} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock81")}
          >
            <div class="svgIcons">
              <img src={Svg81} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock82")}
          >
            <div class="svgIcons">
              <img src={Svg82} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock83")}
          >
            <div class="svgIcons">
              <img src={Svg83} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock84")}
          >
            <div class="svgIcons">
              <img src={Svg84} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock85")}
          >
            <div class="svgIcons">
              <img src={Svg85} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock86")}
          >
            <div class="svgIcons">
              <img src={Svg86} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock87")}
          >
            <div class="svgIcons">
              <img src={Svg87} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock88")}
          >
            <div class="svgIcons">
              <img src={Svg88} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock89")}
          >
            <div class="svgIcons">
              <img src={Svg89} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock90")}
          >
            <div class="svgIcons">
              <img src={Svg90} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock91")}
          >
            <div class="svgIcons">
              <img src={Svg91} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock92")}
          >
            <div class="svgIcons">
              <img src={Svg92} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock93")}
          >
            <div class="svgIcons">
              <img src={Svg93} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock94")}
          >
            <div class="svgIcons">
              <img src={Svg94} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock95")}
          >
            <div class="svgIcons">
              <img src={Svg95} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock96")}
          >
            <div class="svgIcons">
              <img src={Svg96} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock97")}
          >
            <div class="svgIcons">
              <img src={Svg97} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock98")}
          >
            <div class="svgIcons">
              <img src={Svg98} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock99")}
          >
            <div class="svgIcons">
              <img src={Svg99} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock100")}
          >
            <div class="svgIcons">
              <img src={Svg100} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock101")}
          >
            <div class="svgIcons">
              <img src={Svg101} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock102")}
          >
            <div class="svgIcons">
              <img src={Svg102} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock103")}
          >
            <div class="svgIcons">
              <img src={Svg103} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock104")}
          >
            <div class="svgIcons">
              <img src={Svg104} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock105")}
          >
            <div class="svgIcons">
              <img src={Svg105} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock106")}
          >
            <div class="svgIcons">
              <img src={Svg106} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock107")}
          >
            <div class="svgIcons">
              <img src={Svg107} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock108")}
          >
            <div class="svgIcons">
              <img src={Svg108} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock109")}
          >
            <div class="svgIcons">
              <img src={Svg109} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock110")}
          >
            <div class="svgIcons">
              <img src={Svg110} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock111")}
          >
            <div class="svgIcons">
              <img src={Svg111} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock112")}
          >
            <div class="svgIcons">
              <img src={Svg112} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock113")}
          >
            <div class="svgIcons">
              <img src={Svg113} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock114")}
          >
            <div class="svgIcons">
              <img src={Svg114} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock115")}
          >
            <div class="svgIcons">
              <img src={Svg115} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock116")}
          >
            <div class="svgIcons">
              <img src={Svg116} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock117")}
          >
            <div class="svgIcons">
              <img src={Svg117} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock118")}
          >
            <div class="svgIcons">
              <img src={Svg118} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock119")}
          >
            <div class="svgIcons">
              <img src={Svg119} />
            </div>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClose("default", "screenblock120")}
          >
            <div class="svgIcons">
              <img src={Svg120} />
            </div>
          </IconButton>
        </ButtonGroup>
      )}

      {/* <Tooltip title="Create Node">
          <IconButton size='small' onClick={handleOpen} >
          {open?<ButtonGroup className={classes.group2} disableElevation variant="outlined" color="default"></ButtonGroup>:null}
          <DashboardIcon/>
        </IconButton> */}
      <ButtonGroup
        className={classes.toolbarGroup}
        disableElevation
        variant="outlined"
        color="default"
      >
        <Tooltip title="Block Node">
          <IconButton
            size="small"
            onClick={() => handleClose("default", "block")}
          >
            <CheckBoxOutlineBlankIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Decision Node">
          <IconButton
            size="small"
            onClick={() => handleClose("default", "decision")}
          >
            <ChangeHistoryIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Terminator Node">
          <IconButton
            size="small"
            onClick={() => handleClose("default", "terminator")}
            id="border1"
          >
            <Crop75Icon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Screenblocks">
          <IconButton size="small" onClick={handleOpen} id="border2">
            <DashboardIcon />
          </IconButton>
        </Tooltip>

        <IconButton
          className={classes.annotation}
          onClick={() => handleClose("default", "checkcircle")}
        >
          <img src="./annotations/check-circle.svg" />
        </IconButton>
        <IconButton
          className={classes.annotation}
          onClick={() => handleClose("default", "timescircle")}
        >
          <img src="./annotations/times-circle.svg" />
        </IconButton>
        <IconButton
          className={classes.annotation}
          onClick={() => handleClose("default", "infocircle")}
        >
          <img src="./annotations/info-circle.svg" />
        </IconButton>
        <IconButton
          className={classes.annotation}
          id="border3"
          onClick={() => handleClose("default", "questioncircle")}
        >
          <img src="./annotations/question-circle.svg" />
        </IconButton>
        <Tooltip title="Custom Handle">
          <IconButton size="small">
            <TimelineIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>

      <ButtonGroup className={classes.toolbarGroup}>
        <Tooltip title="Undo">
          <IconButton
            size="small"
            onClick={() => handleClose("default", "decision")}
          >
            <UndoIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Redo">
          <IconButton
            size="small"
            onClick={() => handleClose("default", "terminator")}
          >
            <RedoIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
}
