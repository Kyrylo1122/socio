import {
  IconButton,
  IconButtonProps,
  Switch,
  SpeedDialAction,
  Box,
  Button,
  SpeedDial,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
export const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up("xs")]: {
    // marginLeft: theme.spacing(3),
    flex: 1,
    maxWidth: "200px",
  },
  [theme.breakpoints.up("sm")]: {
    maxWidth: "800px",
  },
  [theme.breakpoints.up("md")]: {
    flex: 1,
  },
}));

export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,

  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,

    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",

      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "primary",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.secondary.main,

    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export const StyledSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
  "&:hover, &:focus": {
    backgroundColor: "red",
    color: theme.palette.text.white,
  },
}));
export const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

export const IconBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),

  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("transform"),
  cursor: "pointer",
  "&:hover,&:focus": {
    backgroundColor: theme.palette.background.translucent,
    transform: "scale(1.1)",
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  transition: theme.transitions.create("all"),
}));
export const StyledBtn = styled(Button)(({ theme }) => ({
  transition: theme.transitions.create("all"),
  color: theme.palette.secondary.main,
  "&:hover,&:focus": {
    transform: "scale(1.3)",
  },
}));
export const StyledButton = styled(Button)(({ theme }) => ({
  width: "auto",
  p: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: theme.palette.mode === "light" ? "black" : "white",
  transition: theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover,&:focus": {
    transform: "scale(1.1)",
  },
  [theme.breakpoints.up("xs")]: {
    fontSize: "10px",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "14px",
  },
}));
