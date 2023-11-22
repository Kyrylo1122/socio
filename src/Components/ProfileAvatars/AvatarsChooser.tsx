import { Avatar, ListItem, List } from "@mui/material";
import { AvatarType } from "src/types";
import { avatars as avatarsArray } from "src/Components/ProfileAvatars/ProfilePictures";

interface IAvatarsChooser {
  setAvatar: (value: AvatarType) => void;
}

function AvatarsChooser({ setAvatar }: IAvatarsChooser) {
  return (
    <List
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: { xs: "5px", sm: "10px" },
        flexWrap: "wrap",
      }}
    >
      {avatarsArray.map((avatar) => (
        <ListItem
          sx={{ width: "auto", m: 0, p: 0 }}
          key={avatar.id}
          onClick={() => setAvatar(avatar)}
        >
          <Avatar
            key={avatar.id}
            src={avatar.image}
            alt={avatar.name}
            sx={{ width: { xs: 75, md: 100 }, height: { xs: 75, md: 100 } }}
          />
        </ListItem>
      ))}
    </List>
  );
}
export default AvatarsChooser;
