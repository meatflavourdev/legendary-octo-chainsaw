import { useParams } from "react-router-dom";
import MenuAppBar from "../components/MenuAppBar";

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
      <div class="info">
        <h2>Editor</h2>
        <h3>{doc}</h3>
      </div>
      <MenuAppBar />
    </div>
  );
}

export default Editor;
