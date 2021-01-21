import React, { useRef, useState } from "react"
import { useAuth } from "./contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from 'firebase/app';
import 'firebase/auth';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Box, Paper, Divider } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { RelativePosition } from 'yjs';

const googleIcon = (
  <Icon>
    <img alt="google" src='google.svg' />
  </Icon>
);
const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    top: '100px',
  },
  paper: {
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
    margin: theme.spacing(1, 0, 2),
    height: "50px",
    fontSize: "18px",
    textTransform: "none",
  },
}));

export default function Signup() {
  const classes = useStyles();

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
        <Paper elevation={5}>
        <Box  p={3}>
          <CssBaseline />
          <Grid container alignItems='center' direction='column'>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          </Grid>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Box mt={1}>
                <TextField
                  ref={nameRef}
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  ref={emailRef}
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  ref={passwordRef}
                  variant="outlined"
                  margin="dense"
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
                >
                  Sign Up
                  </Button>
                </Box>
                <Divider variant="middle" />
                <Grid container justify='center'>
                <Typography
                  color="textSecondary"
                  variant="caption"
                >
                  OR
                </Typography>
                </Grid>
                <Grid container justify='center'>
                  <Box mt={1}>
                    <Button
                      startIcon={googleIcon}
                      type="submit"
                      size='medium'
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={() => {
                        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                        firebase.auth().signInWithPopup(googleAuthProvider).then(() => {
                          history.push("/");
                        });
                      }}
                    >
                      Sign Up With Google
                  </Button>
                  </Box>
                </Grid>
              <Grid container>
                <Grid container justify='center'>
                  <Link to="/error">Forgot password?</Link>
                </Grid>
              </Grid>
            </form>
        </Box>
    </Paper>
                <Box mt={2}>
                <Grid container justify='center'>Already registered?
                  <Link to="/login">Sign In</Link>
                </Grid>
                </Box>
      </Container>
  );
}
