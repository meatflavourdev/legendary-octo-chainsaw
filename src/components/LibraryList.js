import { FirestoreCollection } from '@react-firebase/firestore';

function LibraryList() {
  return (
    <ul>
      <FirestoreCollection path="/docs/" limit={100}>
        {d => {
          return d.isLoading ? "Loading" : d.value.map(doc => <li>{ doc.name }</li>)
        }}
      </FirestoreCollection>
    </ul>
  );
}

export default LibraryList;
