import { Box, Button } from "@mui/material";

import { Header } from "./Components";
import Body from "./Components/Body";
import { useUserContext } from "./hooks/useUserContext";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import CustomizedDialogs from "./Components/Dialog";
import SubtitlesOffIcon from "@mui/icons-material/SubtitlesOff";
import useDialogContext from "./hooks/useDialogContext";

const App = () => {
  const { user } = useUserContext();
  const { isOpen, toggle } = useDialogContext();

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {user ? (
        <Box>
          <Header />
        </Box>
      ) : null}
      <Body />
      <Button
        variant="contained"
        sx={{
          position: "fixed",
          p: 3,
          bgcolor: "primary.white",
          color: "primary.accent",
          borderRadius: "50%",
          bottom: 16,
          right: 16,
        }}
        onClick={() => toggle()}
      >
        {isOpen ? <SubtitlesOffIcon /> : <MarkChatUnreadIcon />}
      </Button>

      {isOpen ? <CustomizedDialogs /> : null}
    </Box>
  );
};

export default App;
