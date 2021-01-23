import React from "react";
import { FirestoreCollection } from "@react-firebase/firestore";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DescriptionIcon from "@material-ui/icons/Description";
import List from "@material-ui/core/List";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import styled from "styled-components";
import firebase from "../firebase";
import { DocsInput } from "../firebase/DocsInput";

const HoverText = styled.p`
  color: #808080;
  :hover {
    color: #808080;
    cursor: pointer;
  }
`;
function LibraryList(props) {
  //const [name, setName] = React.useState(doc.name);

  //const onUpdate = () => {
  //  const db = firebase.firestore()
  //  db.collection('docs').doc(doc.id).set({...doc, name})
  //}

  const onDelete = (doc) => {
    console.log("doc", doc);
    const db = firebase.firestore();
    db.collection("docs").doc(doc).delete();
  };

  return (
    <List>
      <FirestoreCollection path="/docs/" limit={100}>
        {(d) => {
          console.log("d", d);
          return d.isLoading
            ? "Loading"
            : d.value
                .filter((doc) =>
                  props.public === "true"
                    ? doc.is_public === true
                    : doc.is_public === false
                )
                .map((doc, i) => {
                  return (
                    <ListItem button key={doc.name}>
                      <ListItemIcon>{<DescriptionIcon />}</ListItemIcon>
                      <ListItemText primary={doc.name} />
                      <HoverText>
                        <DeleteForeverIcon onClick={() => onDelete(d.ids[i])} />
                      </HoverText>
                    </ListItem>
                  );
                });
        }}
      </FirestoreCollection>
    </List>
  );
}

export default LibraryList;
