import { Tooltip, withStyles } from "@material-ui/core";


const AvatarTooltip = ({ collabColor, children, ...props }) => {

  const ColorTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: collabColor.hex,
      color: collabColor.isLight ? '#000' : '#FFF',
    },
    arrow: {
      color: collabColor.hex,
    }
  }))(Tooltip);

  return (
    <ColorTooltip {...props} >
      {children}
    </ColorTooltip>
  );
};

export default AvatarTooltip
