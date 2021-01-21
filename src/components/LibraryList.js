import { FirestoreCollection } from '@react-firebase/firestore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DescriptionIcon from '@material-ui/icons/Description';
import List from '@material-ui/core/List';

function LibraryList(props) {
  return (
    <List>
      <FirestoreCollection path="/docs/" limit={100}>
        {d => {
          return d.isLoading ? "Loading" : d.value.filter(doc => props.public === 'true' ? doc.is_public === true : doc.is_public === false).map(doc => {
              return (
              <ListItem button key={doc.name}>
                <ListItemIcon>{<DescriptionIcon/>}</ListItemIcon>
                <ListItemText primary={doc.name} />
              </ListItem>
              )}
            )}}
      </FirestoreCollection>
    </List>
  );
}


export default LibraryList;
