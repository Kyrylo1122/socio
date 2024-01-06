import { Box } from "@mui/material";
import white from "/outline_white.png";
import black from "/outline_black.png";
import useThemeContext from "src/hooks/useThemeContext";

const NoChatMessages = () => {
  const { mode } = useThemeContext();
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        component="img"
        src={mode === "light" ? black : white}
        alt="no messages"
      />
    </Box>
  );
};

export default NoChatMessages;
