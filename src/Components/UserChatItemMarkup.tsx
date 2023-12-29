import { Box, Button, Typography } from "@mui/material";
import AvatarImage from "./AvatarImage";
import { AvatarImageProps } from "src/types";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { VideocamOff, PhoneDisabled } from "@mui/icons-material";

const UserChatItemMarkup = ({
  name,
  photoUrl,
  defaultCharacter,
}: AvatarImageProps) => {
  const { t } = useTranslation();

  return (
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
          name={name}
          photoUrl={photoUrl}
          defaultCharacter={defaultCharacter}
          sx={{
            width: 75,
            height: 75,
          }}
        />
        <Typography>{name}</Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, pr: 2 }}>
        <Button variant="contained" onClick={() => toast.info(t("video_call"))}>
          <VideocamOff sx={{ color: "primary.accent" }} />
        </Button>
        <Button variant="contained" onClick={() => toast.info(t("phone_call"))}>
          <PhoneDisabled sx={{ color: "primary.accent" }} />
        </Button>
      </Box>
    </Box>
  );
};

export default UserChatItemMarkup;
