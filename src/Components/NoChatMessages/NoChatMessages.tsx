import { Box } from "@mui/material";

import white from "/outline_white.png";
import black from "/outline_black.png";
import useThemeContext from "src/hooks/useThemeContext";

export const NoChatMessages = ({ isDialog }: { isDialog: boolean }) => {
  const { mode } = useThemeContext();
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        component="img"
        src={mode === "light" ? black : white}
        alt="no messages"
        sx={{
          objectFit: "contain",
          width: "100%",
          maxWidth: isDialog ? "250px" : "300px",
        }}
      />
    </Box>
  );
};

export default NoChatMessages;
