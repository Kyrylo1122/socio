import { VideocamOff } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useUserContext } from "src/hooks/useUserContext";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import AvatarImage from "src/Components/AvatarImage";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Chat = () => {
  const { t } = useTranslation();

  const { user } = useUserContext();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "background.paper",
          padding: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AvatarImage
            name={user.name}
            photoUrl={user.photoUrl}
            defaultCharacter={user.defaultCharacter}
            sx={{
              width: 75,
              height: 75,
            }}
          />
          <Typography>{user.name}</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, pr: 2 }}>
          <Button
            variant="contained"
            onClick={() => toast.info(t("video_call"))}
          >
            <VideocamOff sx={{ color: "primary.accent" }} />
          </Button>
          <Button
            variant="contained"
            onClick={() => toast.info(t("phone_call"))}
          >
            <PhoneDisabledIcon sx={{ color: "primary.accent" }} />
          </Button>
        </Box>
      </Box>
      {/* <Messages />
      <Input /> */}
    </Box>
  );
};

export default Chat;
