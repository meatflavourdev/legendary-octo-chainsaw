import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { hexToCSSFilter } from 'hex-to-css-filter';
import { useAuth } from '../../contexts/AuthContext';
import './nodestyles.css';

// UUID generator
const uuid62 = require('uuid62');

// Get ID for the clipping path
const clipID = `svg-clippath-${uuid62.v4()}`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    cursor: 'pointer',
    display: props => props.thisUser,
  },
  collabCursor: {
    position: 'absolute',
    top: '0',
    width: '24px',
    height: '24px',
    filter: props => props.filterData.filter,
    pointerEvents: 'none',
  },
  svgClipPath: {
    width: '0',
    height: '0',
    pointerEvents: 'none',
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
  tooltip: {
    position: 'absolute',
    top: '18px',
    left: '5px',
    pointerEvents: 'none',
  },
  tooltipBody: {
    margin: '0 14px',
    padding: '4px 8px',
    fontSize: '0.625rem',
    maxWidth: 'none',
    wordWrap: 'break-word',
    fontWeight: '500',
    lineHeight: '1.4em',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    backgroundColor: props => props.backgroundColor,
    color: props => props.color,
  },
  tooltipArrow: {
    top: '2px',
    left: '14px',
    width: '0.71em',
    height: '1em',
    marginTop: '4px',
    marginLeft: '-0.71em',
    marginBottom: '4px',
    overflow: 'hidden',
    position: 'absolute',
    boxSizing: 'border-box',
    background: 'none',
    '&:before': {
      transformOrigin: '100% 100%',
      width: '100%',
      height: '100%',
      margin: 'auto',
      content: '""',
      display: 'block',
      transform: 'rotate(45deg)',
      backgroundColor: props => props.backgroundColor,
    },
  },
}));

export default function CursorNode({ data }) {

  const { clientID } = useAuth();

  const cssProps = {
    thisUser: data.clientID === clientID ? 'none' : 'inherit',
    backgroundColor: data.collabColor?.color || 'black', color: data.collabColor.isLight ? 'black' : 'white',
    filterData: hexToCSSFilter(data.collabColor?.color) || 'none',
  }
  console.log('cssProps', cssProps);
  const classes = useStyles(cssProps);

  return (
    <div id={data.nodeKey} className={classes.root}>
      <img src="./img/cursor/001-cursor-01-mask.svg" className={classes.collabCursor} />
      <div className={classes.tooltip}>
        <div className={classes.tooltipBody}>
          {data.displayName}
          {/* <span className={classes.tooltipArrow}></span> */}
        </div>
      </div>
    </div>
  );
}
