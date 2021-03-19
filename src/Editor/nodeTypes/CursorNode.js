import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { hexToCSSFilter } from 'hex-to-css-filter';
import { useAuth } from '../../contexts/AuthContext';
import './nodestyles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    cursor: 'pointer',
    display: props => props.display,
  },
  collabCursor: {
    position: 'absolute',
    top: '0',
    width: '24px',
    height: '24px',
    pointerEvents: 'none',
  },
  tooltip: {
    position: 'absolute',
    top: '17px',
    left: '3.5px',
    pointerEvents: 'none',
  },
  tooltipBody: {
    margin: '0 14px',
    padding: '4px 8px',
    fontSize: '0.625rem',
    maxWidth: 'none',
    wordWrap: 'break-word',
    fontWeight: '400',
    lineHeight: '1.4em',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    backgroundColor: props => props.backgroundColor,
    color: props => props.color,
  },
}));

export default function CursorNode({ id, data }) {
  const { clientID } = useAuth();

  const cssProps = {
    display: data.clientID === clientID ? 'none' : 'inherit',
    backgroundColor: data.collabColor?.color || 'black', color: data.collabColor.isLight ? 'black' : 'white',
    filterData: hexToCSSFilter(data.collabColor?.color) || 'none',
  }
  const classes = useStyles(cssProps);

  return (
    <div id={data.nodeKey} className={classes.root}>
      <img src="./img/cursor/001-cursor-01-mask.svg" className={classes.collabCursor} alt="" style={{ filter: cssProps.filterData.filter.slice(0, -1) }} />
      <div className={classes.tooltip}>
        <div className={classes.tooltipBody}>
          {data.displayName}
        </div>
      </div>
    </div>
  );
}
