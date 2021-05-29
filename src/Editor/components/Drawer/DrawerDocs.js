import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteDocument, useCollection, useCollectionGroup } from '@metamist/swr-firestore';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import logo from '../../../logo.png';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import FolderSharedRoundedIcon from '@material-ui/icons/FolderSharedRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

import useOnClickOutside from '../../hooks/useOnClickOutside';
import { randomConcept } from '../../../helpers/nameGenerators';
import config from '../../../config';
import { Box } from '@material-ui/core';
import ScaleLoader from '@bit/davidhu2000.react-spinners.scale-loader';

import { useBus } from 'react-bus';

const uuid62 = require('uuid62');

const drawerWidth = config.editor.drawerWidth;

const useStyles = makeStyles((theme) => ({
  entropyLogo: {
    display: 'flex',
    justifyContent: 'left',
    flexGrow: 1,
  },
  entropyLogoImg: {
    width: '32px',
    height: '32px',
    marginLeft: '0.8em',
    marginRight: '0.45em',
  },
  entropyLogoText: {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 600,
    fontSize: '1.33rem',
    letterSpacing: '-0.05em',
    color: 'black',
    lineHeight: '1.502',
  },
  docFolder: {
    marginTop: '0.45em',
    '& > span': {
      fontWeight: 500,
    },
  },
  docFileName: {
    lineClamp: 1,
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    wordBreak: 'break-all',
  },
  docFileIcon: {},
  docTitle: {
    flexGrow: 1,
  },
  drawerDocs: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'absolute',
  },
  drawerPaperDocs: {
    width: drawerWidth,
    boxShadow: '0 6px 7px rgb(0 0 0 / 9%), 0 4px 4px rgb(0 0 0 / 15%);',
  },
  drawerHeaderDocs: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  docListHeaderList: {
    paddingBottom: '0.15em',
    paddingTop: '0.5em',
    '& .MuiListItemIcon-root': {
      minWidth: '38px',
    },
  },
  docList: {
    paddingTop: 0,
  },
  docListItem: {
    paddingTop: '0.45em',
    paddingBottom: '0.45em',
    paddingLeft: '1.75em',
    '& .MuiListItemIcon-root': {
      minWidth: '38px',
    },
  },
}));

export default function DrawerDocs({ openDocs, setOpenDocs }) {
  const classes = useStyles();
  const theme = useTheme();

  const authState = useAuthState(firebase.auth());
  const { currentUser } = useAuth();

  let { doc_id } = useParams();

  const bus = useBus();

  const currentDoc = useCollectionGroup('docs', {
    where: [['url', '==', doc_id]],
  });
  if (currentDoc?.data?.length) {
    bus && bus.emit('docLoaded', currentDoc.data[0]);
  }

  const listPublic = useCollection(`/users/${authState[0].uid}/docs/`, {
    listen: true,
    where: [['is_public', '==', true]],
  });
  const listPrivate = useCollection(`/users/${authState[0].uid}/docs/`, {
    listen: true,
    where: [['is_public', '==', false]],
  });

  // Close Doc Drawer
  const handleDocsDrawerClose = useCallback(() => setOpenDocs(false), [setOpenDocs]);

  // Ref to drawer so we can detect outside clicks
  const drawerRef = useRef();
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(drawerRef, handleDocsDrawerClose);

  const scaleLoader = function (data) {
    if (!data) {
      return (
        <Box display="flex" justifyContent="center" m={6}>
          <ScaleLoader height={40} width={10} color="#b4b3fb" />
        </Box>
      );
    }
  };

  const drawerHeader = (
    <div className={classes.drawerHeaderDocs}>
      <Link to="/" className={classes.entropyLogo}>
        <img className={classes.entropyLogoImg} src={logo} alt="Entropy Logo" height="32" width="32" />
        <Typography className={classes.entropyLogoText} variant="h6">
          Entropy
        </Typography>
      </Link>
      <IconButton onClick={handleDocsDrawerClose}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
  );

  const listHeader = function (name, callback) {
    return (
      <List className={classes.docListHeaderList}>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText className={classes.docFolder} primary={name} />
          <div>
            <button className="docsAddIconButton" onClick={callback}>
              <AddBoxRoundedIcon className="docsAddIcon" />
            </button>
          </div>
        </ListItem>
      </List>
    );
  };

  const listData = function (data) {
    return (
      data &&
      data
        .sort(function (a, b) {
          return a.created_date < b.created_date ? -1 : 1;
        })
        .map((doc, index) => (
        <Link className="docListLink" to={`/${doc.url}`} key={doc.url}>
          <ListItem button className={classes.docListItem}>
            <ListItemIcon>
              <DescriptionRoundedIcon className={classes.docFileIcon} />
            </ListItemIcon>
            <ListItemText className={classes.docFileName} secondary={doc.name} />
            <CreateIcon className="docListLinkDelete" onClick={handleEditButton} />
            <DeleteForeverRoundedIcon
              className="docListLinkDelete"
              onClick={(e) => handleDeleteButton(e, `/users/${doc.uid}/docs/${doc.id}`)}
            />
          </ListItem>
        </Link>
      ))
    );
  };

  const [open, setOpen] = React.useState(false);

  const handleAddButton = function (e, isPublic = false) {
    e.preventDefault();
    listPublic.add([
      {
        created_date: firebase.firestore.FieldValue.serverTimestamp(),
        is_public: isPublic,
        is_public_editable: false,
        name: randomConcept(),
        uid: currentUser.uid,
        url: uuid62.v4(),
      },
    ]);
  };
  const handleEditButton = function (e) {
    e.preventDefault();
    console.log('Handle edit button');
  };
  const handleDeleteButton = function (e, path) {
    e.preventDefault();
    setOpen(true);
    deleteDocument(path);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
      <Drawer
        ref={drawerRef}
        className={classes.drawerDocs}
        variant="persistent"
        anchor="left"
        open={openDocs}
        classes={{
          paper: classes.drawerPaperDocs,
        }}
      >
        {drawerHeader}
        <Divider />
        {scaleLoader(listPublic.data, listPrivate.data)}
        {listHeader('Public', (e) => handleAddButton(e, true))}
        {listData(listPublic.data)}
        <Divider />
        {listHeader('Private', (e) => handleAddButton(e, false))}
        {listData(listPrivate.data)}
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="POW! Document Removed."
            action={
              <React.Fragment>
                <Button color="secondary" size="small" onClick={handleClose}>
                  UNDO
                </Button>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
      </Drawer>
  );
}
