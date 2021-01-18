import { useParams } from "react-router-dom";

function Editor() {
  let { doc_id } = useParams();
  let doc = ''
  if (doc_id) {
     doc = <h3>Document ID: {doc_id}</h3>;
  } else {
    doc = <h3>No document is open</h3>;
  }
  return (
    <div>
      <h2>Editor</h2>
        {doc}
    </div>
  );
}

export default Editor;
