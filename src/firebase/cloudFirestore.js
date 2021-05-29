import React from 'react';
import { useCollection } from '@metamist/swr-firestore';

export default function UserList() {
  const { data, update, error } = useCollection('/users/fqBjpB7hBGN1cME5G95garsEfqM2/docs/');

  console.log(data)

  if (error) return <div>Error!</div>;
  if (!data) return <div>Loading...</div>;

  return data.sort((a, b) => {
    return (a.is_public && !b.is_public) || (a.is_public && b.is_public && a.name > b.name) ? 1 : -1;
  }).map((user) => {
    console.log(user)
    return <div key={user.id}>{user.name} : {user.is_public ? 'public' : 'private'}</div>
  });
}


/* function cloudFirestore() {
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
} */
