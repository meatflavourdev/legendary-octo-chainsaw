import React from 'react';
import ProviderFlow from './ProviderFlow';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../logo.png';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddBoxIcon from '@material-ui/icons/AddBox';
import LibraryList from '../components/LibraryList';
import ProfileMenu from '../components/ProfileMenu';
import ShareMenu from '../components/ShareMenu';
import { ListItemIcon } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { useParams } from 'react-router-dom';

const drawerWidth = '22em';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  navlogo: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    color: '#000'
  },
  docname: {
    flexGrow: 1,
    color: '#FFF'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth})`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: 0,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  newdoc: {
    paddingLeft: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

function Editor() {
  const { doc_id } = useParams();
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })} position="fixed">
        <Toolbar>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: openDrawer,
              })}
            >
              <MenuIcon />
          </IconButton>
          <ListItemIcon>{<DescriptionIcon />}</ListItemIcon>
              <Typography variant="h6" className={classes.docname}>
                {doc_id}
                </Typography>

          {auth && (
            <ShareMenu/>
            )}
            <ProfileMenu/>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }),
        }}
      >
        <div className={classes.toolbar}>
        <img className={classes.navlogo} src={logo} alt="Entropy Logo" height="32" width="32" />
          <Typography variant="h6" className={classes.title}>
            Entropy
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.newdoc}>
          <Typography variant="body1">
            Private
          </Typography>
          <IconButton>
            {<AddBoxIcon/>}
          </IconButton>
        </div>
        <LibraryList public='false'/>
        <Divider/>
        <div className={classes.newdoc}>
          <Typography variant="body1">
            Shared
          </Typography>
          <IconButton>
            {<AddBoxIcon/>}
          </IconButton>
        </div>
        <LibraryList public='true'/>
      </Drawer>
      <ProviderFlow />
    </div>
  );
}

export default Editor;
