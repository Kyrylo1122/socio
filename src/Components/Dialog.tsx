import { Box } from "@mui/material";

import ChatUI from "./ChatUI";

export default function CustomizedDialogs() {
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
      <ChatUI isDialog={true} />
    </Box>
  );
}
