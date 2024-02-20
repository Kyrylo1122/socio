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
        width: { xs: "100%", sm: 350 },
        height: "500px",
        position: "fixed",
        zIndex: 100000,
        borderRadius: 2,
        right: { xs: 0, sm: 100 },
        bottom: 0,

        boxShadow: "6px 8px 24px 0px rgba(66, 68, 90, 1)",
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
