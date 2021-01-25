import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Grid } from '@material-ui/core';
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from '@react-firebase/auth';

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.getContrastText('#00e676'),
    backgroundColor: '#00e676',
    marginRight: '15px',
    marginTop:'8px'
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function ProfileMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <IfFirebaseAuthed>
 {({ isSignedIn, user, providerId }) => {
   return (
    <div>
      <IconButton onClick={handleClick} color="inherit">
        <AccountCircleIcon/>
      </IconButton>
      <StyledMenu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem style={{ backgroundColor: 'transparent' }}>
        <Grid container direction='row' justify='center'>
          <Avatar className={classes.avatar}>{user.displayName.slice(0,1)}</Avatar>
            <Grid item>

               <ListItemText primary={user.displayName} secondary={user.email} />
          </Grid>
          </Grid>
          </MenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText onClick={handleLogout} primary="Sign Out" />
        </StyledMenuItem>

      </StyledMenu>
    </div>
   );
 }}
</IfFirebaseAuthed>

  );
}
