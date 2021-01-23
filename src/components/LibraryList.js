import { FirestoreCollection } from '@react-firebase/firestore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DescriptionIcon from '@material-ui/icons/Description';
import List from '@material-ui/core/List';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styled from 'styled-components';

function LibraryList(props) {
  const HoverText = styled.p`
	color: #808080;
	:hover {
		color: #808080;
		cursor: pointer;
  }
  `;

  return (
    <List>
      <FirestoreCollection path="/docs/" limit={100}>
        {d => {
          return d.isLoading ? "Loading" : d.value.filter(doc => props.public === 'true' ? doc.is_public === true : doc.is_public === false).map(doc => {
              return (
              <ListItem button key={doc.name}>
                <ListItemIcon>{<DescriptionIcon/>}</ListItemIcon>
                <ListItemText primary={doc.name} />
                <HoverText>
                <DeleteForeverIcon />
                </HoverText>
              </ListItem>
              )}
            )}}
      </FirestoreCollection>
    </List>
  );
}


export default LibraryList;
