import React, { useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CreateIcon from "@material-ui/icons/Create";
import TextField from "@material-ui/core/TextField";
import AddCircle from "@material-ui/icons/AddCircle";
import logo from "../../logo.png";

import FolderIcon from "@material-ui/icons/Folder";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import FolderSharedRoundedIcon from "@material-ui/icons/FolderSharedRounded";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";

import { FirebaseAuthConsumer } from "@react-firebase/auth";
import {
  FirestoreCollection,
  FirestoreDocument,
  FirestoreMutation,
} from "@react-firebase/firestore";
import firebase from "firebase";
import "firebase/auth";
import { Link } from "react-router-dom";

const uuid62 = require("uuid62");
const generate = require("project-name-generator");
const drawerWidth = 300;

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
  docFileName: {},
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
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
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
}));

export default function DrawerDocs({ openDocs, handleDocsDrawerClose }) {
  const classes = useStyles();
  const theme = useTheme();
  const inputRef = useRef([]);
  const [name, setName] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Drawer
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
          console.log("authData: ", authData);
          const uid = authData.isSignedIn ? authData.user.uid.toString() : 0;
          return (
            <>
              <FirestoreCollection path={`/users/${uid}/docs/`}>
                {(docsData) => {
                  console.log("docsData", docsData);
                  if (docsData.isLoading) {
                    return "Loading";
                  }

                  let onUpdate = (id) => () => {
                    console.log("ONUPDATE ID", id);
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
                                      name: generate().dashed,
                                      url: uuid62.v4(),
                                      is_public: false,
                                      is_public_editable: false,
                                      created_date: firebase.firestore.FieldValue.serverTimestamp(),
                                      uid: uid,
                                    }).then((res) => {
                                      console.log("Ran mutation ", res);
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

                      <List>
                        {docsData.value
                          .filter((doc) => !doc.is_public)
                          .map((doc, index) => (
                            <Link
                              className="docListLink"
                              to={`/${doc.url}`}
                              key={docsData.ids[index]}
                            >
                              <ListItem button>
                                <ListItemIcon>
                                  <DescriptionRoundedIcon
                                    className={classes.docFileIcon}
                                  />
                                </ListItemIcon>
                                {!open ? (
                                  <div>
                                    <ListItemText
                                      className={classes.docFileName}
                                      secondary={doc.name}
                                    />
                                    <CreateIcon
                                      className="docListLinkDelete"
                                      onClick={handleOpen}
                                    />
                                    <DeleteForeverRoundedIcon
                                      className="docListLinkDelete"
                                      onClick={onDelete(docsData.ids[index])}
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <TextField
                                      onChange={(e) => {
                                        setName(e.target.value);
                                      }}
                                    />
                                    <AddCircle
                                      className="docListLinkDelete"
                                      onClick={onUpdate(docsData.ids[index])}
                                    />
                                  </div>
                                )}
                              </ListItem>
                            </Link>
                          ))}
                      </List>
                      <Divider />
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
                                      name: generate().dashed,
                                      url: uuid62.v4(),
                                      is_public: true,
                                      is_public_editable: false,
                                      created_date: firebase.firestore.FieldValue.serverTimestamp(),
                                      uid: uid,
                                    }).then((res) => {
                                      console.log("Ran mutation ", res);
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

                      <List>
                        {docsData.value
                          .filter((doc) => doc.is_public)
                          .map((doc, index) => (
                            <Link
                              className="docListLink"
                              to={`/${doc.url}`}
                              key={docsData.ids[index]}
                            >
                              <ListItem button key={docsData.ids[index]}>
                                <ListItemIcon>
                                  <DescriptionRoundedIcon
                                    className={classes.docFileIcon}
                                  />
                                </ListItemIcon>
                                {!open ? (
                                  <div>
                                    <ListItemText
                                      className={classes.docFileName}
                                      secondary={doc.name}
                                    />
                                    <CreateIcon
                                      className="docListLinkDelete"
                                      onClick={onUpdate(docsData.ids[index])}
                                    />
                                    <DeleteForeverRoundedIcon
                                      className="docListLinkDelete"
                                      onClick={onDelete(docsData.ids[index])}
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <TextField
                                      onChange={(e) => {
                                        setName(e.target.value);
                                      }}
                                    />
                                    <AddCircle
                                      className="docListLinkDelete"
                                      onClick={onUpdate(docsData.ids[index])}
                                    />
                                  </div>
                                )}
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
