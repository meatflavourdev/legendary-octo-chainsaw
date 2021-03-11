import { Tooltip, withStyles } from "@material-ui/core";


const AvatarTooltip = ({ collabColor, children, ...props }) => {

  const ColorTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: collabColor.color,
      color: collabColor.isLight ? '#000' : '#FFF',
    },
    arrow: {
      color: collabColor.color,
    }
  }))(Tooltip);

  return (
    <ColorTooltip {...props} >
      {children}
    </ColorTooltip>
  );
};

export default AvatarTooltip
