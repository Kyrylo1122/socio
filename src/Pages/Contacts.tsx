import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AvatarImage from "src/Components/AvatarImage";
import { useUserContext } from "src/hooks/useUserContext";
import { AvatarImageProps } from "src/types";
import { MailOutline } from "@mui/icons-material";
import useSelectUserChat from "src/hooks/useSelectUserChat";
import useDialogContext from "src/hooks/useDialogContext";

type ContactsMarkupType = AvatarImageProps & { uid: string };
const ContactsMarkup = ({
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
      sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
    >
      <Box
        component={Link}
        to={`/${uid}`}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
        <Typography>{name}</Typography>
      </Box>
      <Box>
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

function Contacts() {
  const { t } = useTranslation();
  const { friends } = useUserContext();

  if (!friends) return;
  return (
    <Box>
      <Typography variant="h2">
        {t("socio_users")} ({friends.length})
      </Typography>
      <List sx={{ display: "flex", flexDirection: "column" }}>
        {friends.map(({ uid, photoUrl, defaultCharacter, name }) => {
          return (
            <ListItem key={uid} sx={{ display: "flex", width: "100%" }}>
              <ContactsMarkup
                photoUrl={photoUrl}
                defaultCharacter={defaultCharacter}
                name={name}
                uid={uid}
              />
              <Divider />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default Contacts;
