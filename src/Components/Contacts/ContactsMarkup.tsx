import { MailOutline } from "@mui/icons-material";
import useSelectUserChat from "src/hooks/useSelectUserChat";
import useDialogContext from "src/hooks/useDialogContext";
import { AvatarImageProps } from "src/types";

import { Link } from "react-router-dom";
import AvatarImage from "src/Components/ProfileAvatars/AvatarImage";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button } from "@mui/material";
type ContactsMarkupType = AvatarImageProps & { uid: string };

export const ContactsMarkup = ({
  uid,
  photoUrl,
  defaultCharacter,
  name,
}: ContactsMarkupType) => {
  const { t } = useTranslation();
  const user = { uid, photoUrl, defaultCharacter, name };
  const { handleSelect } = useSelectUserChat();
  const { isOpen, open } = useDialogContext();

  const handleSendMsg = async () => {
    try {
      await handleSelect(user);
      if (!isOpen) open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        component={Link}
        to={`/${uid}`}
        sx={{
          display: "flex",
          flex: { xs: 1, sm: 2 },
          alignItems: "center",
          gap: 1,
        }}
      >
        <AvatarImage
          name={name}
          photoUrl={photoUrl}
          defaultCharacter={defaultCharacter}
          sx={{
            width: { xs: 50, sm: 60, md: 70 },
            height: { xs: 50, sm: 60, md: 70 },
          }}
        />
        <Typography
          sx={{ fontSize: { xs: "0.7rem", sm: "1rem" }, color: "text.primary" }}
        >
          {name}
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Button
          onClick={handleSendMsg}
          variant="contained"
          sx={{
            p: { xs: "2px 4px", sm: "6px 16px" },
            fontSize: { xs: "10px", sm: "12px" },
            display: "flex",
            alignItems: "center",
            gap: 1,
            border: "1px solid",
            borderColor: "primary.accent",
            "&:hover,&:focus": {
              bgcolor: "primary.accent",
              color: "primary.white",
              borderColor: "primary.accent",
            },
          }}
        >
          {t("write_message")}
          <MailOutline />
        </Button>
      </Box>
    </Box>
  );
};
