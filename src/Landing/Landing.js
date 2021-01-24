import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AppPerspective from './AppPerspective';
import logo from '../logo.png';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Entropy Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  navlogo: {
    marginRight: theme.spacing(1.5),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
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
  heroButtons: {
    padding: '0.5em',
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
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

const tiers = [
  {
    title: 'Replace',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Me',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'with Features',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];
const footers = [
  {
    title: 'Jeremy Dombrowski',
    description: ['Twitter', 'Linkedin', 'Portfolio', 'Email'],
  },
  {
    title: 'Nathan Mckenzie',
    description: ['Twitter', 'Linkedin', 'Portfolio', 'Email'],  },
  {
    title: 'Nik Sofianos',
    description: ['Twitter', 'Linkedin', 'Portfolio', 'Email'],  },
  {
    title: 'Open Source',
    description: ['Design Docs', 'Github'],
  },
];

export default function Landing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img className={classes.navlogo} src={logo} alt="Entropy Logo" height="32" width="32" />
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Entropy
          </Typography>

          <Button href="#" color="primary" variant="contained" className={classes.link}>
            Sign In
          </Button>
          <Button href="#" color="primary" variant="outlined" className={classes.link}>
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="md">
          <Typography className={classes.heroTitle} component="h1" variant="h2" align="center" color="textPrimary"  gutterBottom>
              Communicate visually
            </Typography>
            <Typography className={classes.heroText} variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" size="large" color="primary">
                    Sign Up with Google
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" size="large" color="primary">
                    Sign Up with Email
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      {/* End hero unit */}
      {/* Screenshot */}
      <Container>
        <Box className={classes.appBox} boxShadow={10}>
          <img className={classes.appShot} src="./landing/browserframe_01.png" alt="App Screenshot" />
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
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
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
