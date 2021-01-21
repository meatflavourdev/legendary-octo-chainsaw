import React from 'react';
import { Link } from "react-router-dom";
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
import { Box, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    height: '100vh'
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
    padding: "1em"
  },
}));

export default function Login() {
  const classes = useStyles();

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
            <form className={classes.form} noValidate>
              <TextField
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
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              className={classes.submit}
              size = "large"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/error">Forgot password?</Link>
                </Grid>
                <Grid item>Don't have an account?
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
