import { Box, Button, Fade } from "@mui/material";

import Header from "./Components/Header/Header";
import Main from "./Components/Main";
import { useUserContext } from "./hooks/useUserContext";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import CustomizedDialogs from "./Components/Dialog";
import SubtitlesOffIcon from "@mui/icons-material/SubtitlesOff";
import useDialogContext from "./hooks/useDialogContext";
import Footer from "./Components/Footer";

const App = () => {
  const { user } = useUserContext();
  const { isOpen, toggle, isVisibleChatBtn } = useDialogContext();

  return (
    <Box
      sx={{
        flexDirection: "column",
        position: "relative",
        height: "100%",
      }}
    >
      {user.uid ? (
        <Box>
          <Header />
        </Box>
      ) : null}
      <Main />
      {user.uid ? (
        <Fade in={isVisibleChatBtn}>
          {
            <Button
              variant="contained"
              sx={{
                zIndex: 99999,
                position: "fixed",
                p: { xs: 2, sm: 3 },
                bgcolor: "primary.white",
                color: "primary.accent",
                borderRadius: "50%",
                bottom: { xs: 10, sm: 16 },
                right: { xs: 10, sm: 16 },
              }}
              onClick={() => toggle()}
            >
              {isOpen ? <SubtitlesOffIcon /> : <MarkChatUnreadIcon />}
            </Button>
          }
        </Fade>
      ) : null}
      {isOpen && user.uid ? <CustomizedDialogs /> : null}
      <Footer />
    </Box>
  );
};

export default App;
