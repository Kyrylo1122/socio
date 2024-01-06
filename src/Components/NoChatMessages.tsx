import { Box } from "@mui/material";
import img from "/outline_white.png";
const NoChatMessages = () => {
  return (
    <Box>
      <Box component="img" src={img} alt="no messages" />
      NoChatMessages
    </Box>
  );
};

export default NoChatMessages;
