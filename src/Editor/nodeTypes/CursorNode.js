import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './nodestyles.css';
import { useAuth } from '../../contexts/AuthContext';

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
    width: '100%',
    height: '100%',
    backgroundColor: props => props.backgroundColor,
    clipPath: `url(#${clipID})`,
    '-webkit-clip-path': `url(#${clipID})`,
    pointerEvents: 'none',
    cursor: 'pointer',
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

  const props = { thisUser: data.clientID === clientID ? 'none' : 'inherit', backgroundColor: data.collabColor?.color || 'black', color: data.collabColor.isLight ? 'black' : 'white' }
  const classes = useStyles(props);

  return (
    <div id={data.nodeKey} className={classes.root}>
      <svg className={classes.svgClipPath}>
        <clipPath id={clipID} clipPathUnits="objectBoundingBox">
          <path d="M0.005,0.108 c-0.024,-0.064,0.039,-0.127,0.103,-0.103 c0.209,0.077,0.045,0.017,0.839,0.31 c0.071,0.026,0.07,0.127,-0.001,0.152 c-0.193,0.067,-0.145,0.05,-0.32,0.111 c-0.023,0.008,-0.04,0.026,-0.048,0.048 L0.467,0.946 c-0.025,0.071,-0.125,0.072,-0.152,0.001 C0.024,0.158,0.109,0.39,0.005,0.108 L0.005,0.108"></path>
        </clipPath>
      </svg>
        <div className={classes.collabCursor} />
      <div className={classes.tooltip}>
        <div className={classes.tooltipBody}>
          {data.displayName}
          {/* <span className={classes.tooltipArrow}></span> */}
        </div>
      </div>
    </div>
  );
}
