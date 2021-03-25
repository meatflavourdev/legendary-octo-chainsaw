import React, { useCallback, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import logo from '../logo.png';
import { Avatar } from '@material-ui/core';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { IfFirebaseAuthedAnd, IfFirebaseUnAuthed } from '@react-firebase/auth';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBox: {
    borderRadius: '15px',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
    marginBottom: '8em',
  },
  appShot: {
    width: '100%',
    height: '100%',
  },
  appBar: {
    color: '#000000',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  navlogo: {
    marginRight: "0.45em",
  },
  entropyLogoText: {
    flexGrow: 1,
    fontFamily: "\"Inter\", sans-serif",
    fontWeight: 600,
    fontSize: '1.33rem',
    letterSpacing: '-0.04em',
    lineHeight: '1.502',
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  avatar: {
    color: theme.palette.getContrastText('#00e676'),
    backgroundColor: '#00e676',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
  },
  heroContent: {
    padding: theme.spacing(6, 0, 7),
  },
  heroTitle: {
    fontWeight: 600,
  },
  heroText: {
    padding: '0.25em',
  },
  heroDescription: {
    maxWidth: '65em',
  },
  heroButtons: {
    padding: '0.5em',
  },
  heroButtonXL: {
    padding: '0.6em 2.5em',
    fontSize: '1.25em',
    height: '59px',
  },
  heroButtonGoogle: {
    padding: '0.6em 1em',
    fontSize: '1.25em',
  },
  heroButtonXXL: {
    padding: '0.6em 2.5em',
    fontSize: '1.5em',
  },
  heroGoogleIcon: {
    margin: '0',
    marginRight: '0.5em',
    padding: '0',
  },
  cardHeader: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const footers = [
  {
    title: 'Jeremy Dombrowski',
    description: [
      { text: 'Twitter', href: 'https://twitter.com/meatflavourdev' },
      { text: 'Linkedin', href: 'https://www.linkedin.com/in/jeremydombrowski/' },
      { text: 'Github', href: 'https://github.com/meatflavourdev' },
      { text: 'Portfolio', href: 'https://www.meatflavour.dev/' },
      { text: 'Email', href: 'mailto:jeremy@meatflavour.dev' },
    ],
  },
  {
    title: 'Nathan Mckenzie',
    description: [
      { text: 'Linkedin', href: 'https://www.linkedin.com/in/nathan-mckenzie-2020/' },
      { text: 'Github', href: 'https://github.com/nathantmckenzie' },
      { text: 'Email', href: 'mailto:nathantaylormckenzie@hotmail.com' },
    ],
  },
  {
    title: 'Nik Sofianos',
    description: [
      { text: 'Github', href: 'https://github.com/nsofianos' },
      { text: 'Email', href: 'mailto:sofianos.n@outlook.com' },
    ],
  },
  {
    title: 'Open Source',
    description: [
      {
        text: 'Design Docs',
        href: 'https://www.notion.so/Entropy-Project-Wiki-05d389328d4f4e498f41adc741c4e31b',
      }, {
        text: 'Github',
        href: 'https://github.com/meatflavourdev/legendary-octo-chainsaw/',
      },
    ],
  },
];

function NavButtonsNoAuth({googleSignin}) {
  const classes = useStyles();

  return (
    <IfFirebaseUnAuthed>
      <Button onClick={googleSignin} color="primary" variant="contained" className={classes.link}>
        Sign Up
      </Button>
    </IfFirebaseUnAuthed>
  );
}

function NavButtonsAuth({handleLogout}) {
  const classes = useStyles();
  return (
    <IfFirebaseAuthedAnd
      filter={({ providerId, user }) => {
        if (!user.email) {
          return false;
        }
        return providerId !== 'anonymous';
      }}
    >
      {({ isSignedIn, user, providerId }) => {
        return (
          <>
            <Avatar className={classes.avatar} src={user.photoURL} />
            <Typography variant="h6" color="inherit" noWrap className={classes.link}>
              {user.displayName}
            </Typography>
            <Button onClick={handleLogout} color="primary" variant="contained" className={classes.link}>
              Sign Out
            </Button>
          </>
        );
      }}
    </IfFirebaseAuthedAnd>
  );
}
function HeroButtonsAuth({handleAppClick}) {
  const classes = useStyles();

  return (
    <IfFirebaseAuthedAnd
      filter={({ providerId, user }) => {
        if (!user.email) {
          return false;
        }
        return providerId !== 'anonymous';
      }}
    >
      {({ isSignedIn, user, providerId }) => {
        return (
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  onClick={handleAppClick}
                  variant="contained"
                  className={classes.heroButtonXXL}
                  size="large"
                  color="primary"
                >
                  Check it out!
                </Button>
              </Grid>
            </Grid>
          </div>
        );
      }}
    </IfFirebaseAuthedAnd>
  );
}

function HeroButtonsNoAuth({googleSignin}) {
  const classes = useStyles();

  return (
    <IfFirebaseUnAuthed>
      <div className={classes.heroButtons}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button className={classes.heroButtonGoogle} onClick={googleSignin} variant="contained" size="large" color="primary">
              <img className={classes.heroGoogleIcon} src="/img/btn_google_01.svg" alt="Google Logo" width="38" height="38" />
              Sign In with Google
            </Button>
          </Grid>
        </Grid>
      </div>
    </IfFirebaseUnAuthed>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Legendary Octo Chainsaw
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Landing() {
  const classes = useStyles();

  const [error, setError] = useState('');
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      history.push('/');
    } catch {
      setError('Failed to log out');
    }
  }

  const googleSignin = () => {
    console.log('Google Signin Activated');
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(() => {
        history.push('/app');
      });
  }

  const handleAppClick = useCallback(() => history.push('/app'), [history]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img className={classes.navlogo} src={logo} alt="Entropy Logo" height="32" width="32" />
          <Typography variant="h6" color="inherit" noWrap className={classes.entropyLogoText}>
            Entropy
          </Typography>
          <NavButtonsAuth handleLogout={handleLogout} />
          <NavButtonsNoAuth googleSignin={googleSignin} />
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Typography
            className={classes.heroTitle}
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Communicate visually
          </Typography>
          </Container>
          <Container className={classes.heroDescription}>
          <Typography className={classes.heroText} variant="h4" align="center" color="textSecondary" paragraph>
            Your design process needs real-time collaboration.
          </Typography>
          <Typography className={classes.heroText} variant="h5" align="center" color="textSecondary" paragraph>
          Entropy enables users to create flow diagrams &amp; communicate visually in real-time. Powered by React and Websockets.
          </Typography>
          <HeroButtonsAuth handleAppClick={handleAppClick} />
          <HeroButtonsNoAuth googleSignin={googleSignin} />
        </Container>
      </div>
      {/* End hero unit */}
      {/* Screenshot */}
      <Container>
        <Box className={classes.appBox} boxShadow={15}>
          <img className={classes.appShot} src="/img/landing/browserframe_01.png" alt="App Screenshot" />
        </Box>
      </Container>
      {/* End Screenshot */}
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} variant="subtitle1" color="textSecondary">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
