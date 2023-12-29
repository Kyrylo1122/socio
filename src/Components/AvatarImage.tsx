import { Avatar } from "@mui/material";
import { createAvatarLink } from "src/utils/createAvatarLink";
import { SxProps, Theme } from "@mui/material/styles";

interface AvatarImage {
  photoUrl: string | null;
  defaultCharacter: number;
  name: string;
  sx?: SxProps<Theme>;
}

const style = {
  backgroundColor: "primary.accent",
  border: "2px solid white",
};
export default function AvatarImage({
  photoUrl,
  defaultCharacter,
  name,
  sx,
}: AvatarImage) {
  return (
    <Avatar
      alt={name}
      src={createAvatarLink(photoUrl, defaultCharacter)}
      sx={[style, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
}
