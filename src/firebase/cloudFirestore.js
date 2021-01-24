import { FirestoreCollection, FirestoreDocument, FirestoreMutation } from '@react-firebase/firestore';
import firebase from 'firebase';

function cloudFirestore() {
  return (
    <>
      <FirestoreCollection path="/docs/" limit={100}>
        {d => {
          return d.isLoading ? "Loading" : (
            <div>
              <h2>/docs Collection</h2>
              <pre>
                <code>({JSON.stringify(d, null, 2)}</code>
              </pre>
            </div>
          );
        }}
      </FirestoreCollection>
      <FirestoreDocument path="/docs/RttVhSyDRX5fcjEnJ1uf">
        {(d) => {
          console.log(d);
          return d.isLoading ? "Loading" : (
            <div>
              <h2>/docs/RttVhSyDRX5fcjEnJ1uf Document</h2>
              <pre>
                <code>({JSON.stringify(d, null, 2)}</code>
              </pre>
            </div>
          );
        }}
      </FirestoreDocument>
      <FirestoreMutation type="set" path="/docs/RttVhSyDRX5fcjEnJ1uf">
  {({ runMutation }) => {
    return (
      <div>
        <h2> Mutate state </h2>
        <button
          onClick={() => {
            runMutation({
              nowOnCli: Date.now(),
              nowOnServer: firebase.firestore.FieldValue.serverTimestamp()
            }).then(res => {
              console.log("Ran mutation ", res);
            });
          }}
        >
          Mutate Set
        </button>
      </div>
    );
  }}
</FirestoreMutation>
    </>
  );
}

export default cloudFirestore;
