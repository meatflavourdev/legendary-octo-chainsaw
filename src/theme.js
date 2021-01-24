import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#795cfc',
      //main: '#651fff',
    },
    secondary: {
      main: '#00e676',
    },
  },
});

export default theme;
