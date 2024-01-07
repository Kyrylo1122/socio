import { Box, Button, SpeedDial, SpeedDialIcon } from "@mui/material";

import { Header } from "./Components";
import Body from "./Components/Body";
import { useUserContext } from "./hooks/useUserContext";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import { useState } from "react";
import CustomizedDialogs from "./Components/Dialog";
import SubtitlesOffIcon from "@mui/icons-material/SubtitlesOff";

const App = () => {
  const { user } = useUserContext();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

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
        onClick={() => setIsOpenDialog((state) => !state)}
      >
        {isOpenDialog ? <SubtitlesOffIcon /> : <MarkChatUnreadIcon />}
      </Button>

      {isOpenDialog ? (
        <CustomizedDialogs handleClose={() => setIsOpenDialog(false)} />
      ) : null}
    </Box>
  );
};

export default App;
