import { FirestoreCollection, FirestoreDocument } from '@react-firebase/firestore';

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
      <FirestoreDocument path="/docs/zMMXUvk0mtyQD3wWpvxJ">
        {(d) => {
          console.log(d);
          return d.isLoading ? "Loading" : (
            <div>
              <h2>/docs/zMMXUvk0mtyQD3wWpvxJ Document</h2>
              <pre>
                <code>({JSON.stringify(d, null, 2)}</code>
              </pre>
            </div>
          );
        }}
      </FirestoreDocument>
    </>
  );
}

export default cloudFirestore;
