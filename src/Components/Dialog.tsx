import { Box, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import ChatUI from "./ChatUI";
import useThemeContext from "src/hooks/useThemeContext";

interface ICustomizedDialogs {
  handleClose: () => void;
}
export default function CustomizedDialogs({ handleClose }: ICustomizedDialogs) {
  const { mode } = useThemeContext();
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        width: "350px",
        height: "500px",
        position: "fixed",
        borderRadius: 2,
        right: 100,
        bottom: 0,
      }}
    >
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          color: mode === "light" ? "primary.accent" : "primary.white",
          //   bgcolor: "black",
          top: 0,
          right: 0,
          "&:hover,&:focus": {
            color: "primary.accent",
          },
        }}
        onClick={() => handleClose()}
      >
        <ClearIcon />
      </Button>
      <ChatUI isDialog={true} />
    </Box>
  );
}
