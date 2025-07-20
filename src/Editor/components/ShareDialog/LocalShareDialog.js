import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import { useCopy } from '@react-hook/copy';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  shareUrl: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  urlField: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },
  infoSection: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(1),
  },
  successMessage: {
    color: theme.palette.success.main,
    marginLeft: theme.spacing(1),
  },
}));

export default function LocalShareDialog({ open, handleClose, docId }) {
  const classes = useStyles();
  const [copied, copyToClipboard] = useCopy();
  const [showCopied, setShowCopied] = useState(false);
  
  // Generate the shareable URL
  const shareableUrl = `${window.location.origin}/${docId}`;
  
  // Handle copy button click
  const handleCopy = () => {
    copyToClipboard(shareableUrl);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="local-share-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="local-share-dialog-title">
        Share this whiteboard
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Share this URL with others to collaborate on this whiteboard in real-time using peer-to-peer connections.
        </DialogContentText>
        
        <div className={classes.shareUrl}>
          <TextField
            className={classes.urlField}
            variant="outlined"
            value={shareableUrl}
            InputProps={{
              readOnly: true,
            }}
          />
          <Tooltip title="Copy to clipboard">
            <Button
              variant="contained"
              color="primary"
              startIcon={<FileCopyIcon />}
              onClick={handleCopy}
            >
              Copy
              {showCopied && <span className={classes.successMessage}>Copied!</span>}
            </Button>
          </Tooltip>
        </div>
        
        <div className={classes.infoSection}>
          <Typography variant="h6" gutterBottom>
            How collaboration works in local mode
          </Typography>
          <Typography variant="body2" paragraph>
            This whiteboard uses WebRTC for peer-to-peer connections, allowing direct collaboration without requiring a central server.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Key features:</strong>
          </Typography>
          <Typography variant="body2" component="ul">
            <li>Changes are synchronized in real-time between all connected users</li>
            <li>Your data is stored locally in your browser</li>
            <li>No account required - just share the URL</li>
            <li>Works even when offline (changes will sync when reconnected)</li>
          </Typography>
        </div>
        
        <Typography variant="body2" color="textSecondary">
          Note: For the best experience, all collaborators should be on the same network or have direct connectivity.
          If you're having trouble connecting, try using a different network or switching to cloud mode.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}