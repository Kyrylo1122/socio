import { Box, Button, Fade } from "@mui/material";

import { Header } from "./Components";
import Body from "./Components/Body";
import { useUserContext } from "./hooks/useUserContext";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import CustomizedDialogs from "./Components/Dialog";
import SubtitlesOffIcon from "@mui/icons-material/SubtitlesOff";
import useDialogContext from "./hooks/useDialogContext";

const App = () => {
  const { user } = useUserContext();
  const { isOpen, toggle, isVisibleChatBtn } = useDialogContext();

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {user.uid ? (
        <Box>
          <Header />
        </Box>
      ) : null}
      <Body />
      <Fade in={isVisibleChatBtn}>
        {
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
        }
      </Fade>

      {isOpen ? <CustomizedDialogs /> : null}
    </Box>
  );
};

export default App;
