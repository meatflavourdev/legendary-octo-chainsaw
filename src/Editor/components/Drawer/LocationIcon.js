import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  locationIconContainer: {
    boxShadow: '1px 1px 6px rgb(0 0 0 / 22%), 1px 2px 4px rgb(0 0 0 / 18%)',
    borderRadius: '100%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props => props.collabColor.hex,
    '& > svg': {
      width: '24px',
      height: '24px',
    }
  },
}));

export default function LocationIcon({ collabColor }) {
  const cssProps = {collabColor};
  const classes = useStyles(cssProps);

  return (
    <div class={classes.locationIconContainer}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={collabColor.isLight ? '#000' : '#FFF'}>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
  );
}
