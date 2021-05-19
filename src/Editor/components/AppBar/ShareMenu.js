import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import ShareIcon from '@material-ui/icons/Share';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '10px',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
));

const StyledButton = withStyles((theme) => ({
  root: {
    marginTop: '5px',
    width:'150px'
  },
}))(Button);

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = React.useState({
    public: true,
    editable: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <IconButton onClick={handleClick} color="inherit">
        <ShareIcon  style={{ fontSize: 26 }}/>
      </IconButton>

      <StyledMenu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={state.public} onChange={handleChange} name="public" />}
              label="Public"
            />
            <FormControlLabel
              control={<Switch checked={state.editable} onChange={handleChange} name="editable" />}
              label="Editable"
            />
            <StyledButton
              size="small"
              variant="contained"
              startIcon={<LinkIcon/>}
              color="primary">Copy Link
            </StyledButton>
          </FormGroup>
        </FormControl>
      </StyledMenu>
    </div>
  );
}
