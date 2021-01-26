import React, { useRef, useState } from 'react';
import firebase from 'firebase/app';
import { useAuth } from './contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Box, Divider, Icon, Paper } from '@material-ui/core';

const googleIcon = (
  <Icon>
    <img alt="google" src='google.svg' />
  </Icon>
);

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    height: '100vh',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: '1em',
  },
}));

export default function Login() {
  const classes = useStyles();

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/editor');
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  }

  return (
    <Box className={classes.boxContainer} display="flex" alignItems="center">
      <Container component="main" maxWidth="xs">
        <Paper elevation={3}>
          <Box p={3}>
            <CssBaseline />
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                inputRef={emailRef}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                inputRef={passwordRef}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                size="large"
              >
                Sign In
              </Button>
              <Divider variant="middle" />
              <Grid container justify="center">
                <Typography color="textSecondary" variant="caption">
                  OR
                </Typography>
              </Grid>
              <Grid container justify="center">
                <Box mt={1}>
                  <Button
                    startIcon={googleIcon}
                    type="submit"
                    size="medium"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => {
                      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                      firebase
                        .auth()
                        .signInWithPopup(googleAuthProvider)
                        .then(() => {
                          history.push('/editor');
                        });
                    }}
                  >
                    Sign In With Google
                  </Button>
                </Box>
              </Grid>
              <Grid container>
                <Grid item>
                  Don't have an account?
                  <Link to="/signup"> Sign Up</Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
