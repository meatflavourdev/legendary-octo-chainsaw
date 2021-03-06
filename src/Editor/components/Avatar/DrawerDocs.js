import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";

import { FirebaseAuthConsumer } from "@react-firebase/auth";
import {
  FirestoreCollection,
  FirestoreMutation,
} from "@react-firebase/firestore";
import firebase from "firebase";
import "firebase/auth";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import logo from "../../../logo.png";

import CreateIcon from "@material-ui/icons/Create";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FolderIcon from "@material-ui/icons/Folder";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import FolderSharedRoundedIcon from "@material-ui/icons/FolderSharedRounded";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";

import ScaleLoader from '@bit/davidhu2000.react-spinners.scale-loader';

import useOnClickOutside from "../../hooks/useOnClickOutside";
import { randomConcept } from "../../../helpers/nameGenerators";
import config from '../../../config';
import { Box } from "@material-ui/core";

const uuid62 = require("uuid62");

const drawerWidth = config.editor.drawerWidth;

const useStyles = makeStyles((theme) => ({
  entropyLogo: {
    display: "flex",
    justifyContent: "left",
    flexGrow: 1,
  },
  entropyLogoImg: {
    width: "32px",
    height: "32px",
    marginLeft: "0.8em",
    marginRight: "0.5em",
  },
  entropyLogoText: {},
  docFolder: {},
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
    position: "absolute",
  },
  drawerPaperDocs: {
    width: drawerWidth,
    boxShadow: "0 6px 7px rgb(0 0 0 / 9%), 0 4px 4px rgb(0 0 0 / 15%);",
  },
  drawerHeaderDocs: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  docListHeaderList: {
    paddingBottom: '0.15em',
    paddingTop: '0.5em',
  },
  docList: {
    paddingTop: 0,
  },
  docListItem: {
    paddingTop: '0.45em',
    paddingBottom: '0.45em',
  },
}));

export default function DrawerDocs({ openDocs, setOpenDocs }) {
  const classes = useStyles();
  const theme = useTheme();
  const [name, setName] = React.useState();

  // Close Doc Drawer
  const handleDocsDrawerClose = useCallback(() => setOpenDocs(false), [setOpenDocs]);

  // Ref to drawer so we can detect outside clicks
  const drawerRef = useRef();
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(drawerRef, handleDocsDrawerClose);

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
      <div className={classes.drawerHeaderDocs}>
        <Link to='/' className={classes.entropyLogo}>
          <img
            className={classes.entropyLogoImg}
            src={logo}
            alt="Entropy Logo"
            height="32"
            width="32"
          />
          <Typography
            className={classes.entropyLogoText}
            variant="h6"
            className={classes.title}
          >
            Entropy
          </Typography>
        </Link>
        <IconButton onClick={handleDocsDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />

      <FirebaseAuthConsumer>
        {(authData) => {
          const uid = authData.isSignedIn ? authData.user.uid.toString() : 0;
          return (
            <>
              <FirestoreCollection path={`/users/${uid}/docs/`}>
                {(docsData) => {
                  //console.log("docsData", docsData);
                  if (docsData.isLoading) {
                    return (
                      <Box display="flex" justifyContent="center" m={6} >
                        <ScaleLoader
                        height={40}
                        width={10}
                        color='#b4b3fb'
                        />
                      </Box>

                    );
                  }

                  let onUpdate = (id) => () => {
                    //console.log("ONUPDATE ID", id);
                    var db = firebase.firestore();
                    db.collection("users")
                      .doc(uid)
                      .collection("docs")
                      .doc(id)
                      .set({
                        name: name,
                        url: uuid62.v4(),
                        is_public: false,
                        is_public_editable: false,
                        created_date: firebase.firestore.FieldValue.serverTimestamp(),
                        uid: uid,
                      });
                  };

                  let onDelete = (id) => () => {
                    var database = firebase.firestore();
                    database
                      .collection("users")
                      .doc(uid)
                      .collection("docs")
                      .doc(id)
                      .delete();
                  };

                  return (
                    <>
                      <List className={classes.docListHeaderList}>
                        <ListItem>
                          <ListItemIcon>
                            <FolderIcon />
                          </ListItemIcon>
                          <ListItemText
                            className={classes.docFolder}
                            primary="Private"
                          />
                          <FirestoreMutation
                            type="add"
                            path={`/users/${uid}/docs/`}
                          >
                            {({ runMutation }) => {
                              return (
                                <div>
                                  <button
                                    className="docsAddIconButton"
                                    onClick={() => {
                                      runMutation({
                                        name: randomConcept(),
                                        url: uuid62.v4(),
                                        is_public: false,
                                        is_public_editable: false,
                                        created_date: firebase.firestore.FieldValue.serverTimestamp(),
                                        uid: uid,
                                      }).then((res) => {
                                        //console.log("Ran mutation ", res);
                                      });
                                    }}
                                  >
                                    <AddBoxRoundedIcon className="docsAddIcon" />
                                  </button>
                                </div>
                              );
                            }}
                          </FirestoreMutation>
                        </ListItem>
                      </List>

                      <List className={classes.docList}>
                        {docsData.value
                          .filter((doc) => !doc.is_public)
                          .map((doc, index) => (
                            <Link
                              className="docListLink"
                              to={`/${doc.url}`}
                              key={docsData.ids[index]}
                            >
                              <ListItem button className={classes.docListItem}>
                                <ListItemIcon>
                                  <DescriptionRoundedIcon className={classes.docFileIcon} />
                                </ListItemIcon>
                                <ListItemText className={classes.docFileName}secondary={doc.name} />
                                <CreateIcon className="docListLinkDelete" />
                                <DeleteForeverRoundedIcon className="docListLinkDelete" />
                              </ListItem>
                            </Link>
                          ))}
                      </List>
                      <Divider />
                      <List className={classes.docListHeaderList}>
                        <ListItem>
                          <ListItemIcon>
                            <FolderSharedRoundedIcon />
                          </ListItemIcon>
                          <ListItemText
                            className={classes.docFolder}
                            primary="Public"
                          />
                          <FirestoreMutation
                            type="add"
                            path={`/users/${uid}/docs/`}
                          >
                            {({ runMutation }) => {
                              return (
                                <div>
                                  <button
                                    className="docsAddIconButton"
                                    onClick={() => {
                                      runMutation({
                                        name: randomConcept(),
                                        url: uuid62.v4(),
                                        is_public: true,
                                        is_public_editable: false,
                                        created_date: firebase.firestore.FieldValue.serverTimestamp(),
                                        uid: uid,
                                      }).then((res) => {
                                        //console.log("Ran mutation ", res);
                                      });
                                    }}
                                  >
                                    <AddBoxRoundedIcon className="docsAddIcon" />
                                  </button>
                                </div>
                              );
                            }}
                          </FirestoreMutation>
                        </ListItem>
                      </List>

                      <List className={classes.docList}>
                        {docsData.value
                          .filter((doc) => doc.is_public)
                          .map((doc, index) => (
                            <Link
                              className="docListLink"
                              to={`/${doc.url}`}
                              key={docsData.ids[index]}
                            >
                              <ListItem button className={classes.docListItem}>
                                <ListItemIcon>
                                  <DescriptionRoundedIcon className={classes.docFileIcon} />
                                </ListItemIcon>
                                <ListItemText className={classes.docFileName}secondary={doc.name} />
                                <CreateIcon className="docListLinkDelete" />
                                <DeleteForeverRoundedIcon className="docListLinkDelete" />
                              </ListItem>
                            </Link>
                          ))}
                      </List>
                    </>
                  );
                }}
              </FirestoreCollection>
            </>
          );
        }}
      </FirebaseAuthConsumer>
    </Drawer>
  );
}
