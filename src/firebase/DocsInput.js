import React from "react";
import firebase from '../firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const DocsInput = ({ doc }) => {
  const [name, setName] = React.useState(doc.name);
  const onUpdate = () => {
    const db = firebase.firestore()
    db.collection('docs').doc(doc.id).set({...doc, name})
  }

  const onDelete = () => {
    const db = firebase.firestore()
    db.collection('docs').doc(doc.id).delete()
  }

  return (
    <>
      <input
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <DeleteForeverIcon onClick={onDelete} />
    </>
  );
};