import { Box, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import ChatUI from "./ChatUI";
import useThemeContext from "src/hooks/useThemeContext";
import useDialogContext from "src/hooks/useDialogContext";

export default function CustomizedDialogs() {
  const { mode } = useThemeContext();
  const { close } = useDialogContext();

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
          top: 0,
          right: 0,
          "&:hover,&:focus": {
            color: "primary.accent",
          },
        }}
        onClick={() => close()}
      >
        <ClearIcon />
      </Button>
      <ChatUI isDialog={true} />
    </Box>
  );
}
