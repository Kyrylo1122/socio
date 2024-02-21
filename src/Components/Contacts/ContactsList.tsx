import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ContactsMarkup } from "src/Components/Contacts/ContactsMarkup";

import { IUser } from "src/types";

export const ContactsList = ({ friends }: { friends: IUser[] }) => {
  const { t } = useTranslation();

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
};
