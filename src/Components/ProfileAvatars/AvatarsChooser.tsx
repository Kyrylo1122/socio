import { Avatar, ListItem, List } from "@mui/material";
import { AvatarType } from "src/types";
import { avatars as avatarsArray } from "src/Components/ProfileAvatars/ProfilePictures";

interface IAvatarsChooser {
  setAvatar: (value: AvatarType) => void;
}

function AvatarsChooser({ setAvatar }: IAvatarsChooser) {
  return (
    <List sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {avatarsArray.map((avatar) => (
        <ListItem
          sx={{ width: "auto" }}
          key={avatar.id}
          onClick={() => setAvatar(avatar)}
        >
          <Avatar
            key={avatar.id}
            src={avatar.image}
            alt={avatar.name}
            sx={{ width: 100, height: 100 }}
          />
        </ListItem>
      ))}
    </List>
  );
}
export default AvatarsChooser;
