import { SpeedDialAction } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useThemeContext from "src/hooks/useThemeContext";
import { StyledSpeedDial } from "./ui/StyledComponents";

interface IAction {
  icon: React.ReactElement;
  name: string;
  onClick: () => void;
}
interface IPlaygroundSpeedDial {
  actions: IAction[];
  direction: "left" | "right" | "up" | "down" | undefined;
}
export default function PlaygroundSpeedDial({
  actions,
  direction,
}: IPlaygroundSpeedDial) {
  const { mode } = useThemeContext();
  return (
    <StyledSpeedDial
      sx={{ position: "static" }}
      ariaLabel="Actions"
      icon={<MoreHorizIcon />}
      direction={direction}
    >
      {actions.map((action) => (
        <SpeedDialAction
          FabProps={{ onClick: () => action.onClick() }}
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          sx={{
            "&.MuiSpeedDialAction-fab": {
              bgcolor: mode === "light" ? "primary.white" : "primary.dark",
              color: mode === "light" ? "primary.accent" : "primary.light",
              "&:hover,:focus": {
                color: "primary.accent",
                bgcolor: "primary.white",
                transform: "scale(1.2)",
              },
            },
          }}
        />
      ))}
    </StyledSpeedDial>
  );
}
