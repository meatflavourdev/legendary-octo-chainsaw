import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import "./nodestyles.css";

const useStyles = makeStyles((theme) => ({
  collabCursor: {
    width: '16px',
    height: '16px',
    backgroundImage: 'url(/img/cursor/001-cursor-01-mask.svg)',
  }
}));

export default function CollabCursor({ data }) {
  const classes = useStyles();

  return (
    <div className={classes.collabCursor}></div>
  );
}
