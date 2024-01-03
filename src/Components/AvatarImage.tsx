import { Avatar } from "@mui/material";
import { createAvatarLink } from "src/utils/createAvatarLink";
import { AvatarImageProps } from "src/types";

const style = {
  backgroundColor: "primary.accent",
  border: "2px solid white",
};
export default function AvatarImage({
  photoUrl,
  defaultCharacter,
  name,
  sx,
  ...rest
}: AvatarImageProps) {
  return (
    <Avatar
      {...rest}
      alt={name}
      src={createAvatarLink({ photoUrl, defaultCharacter })}
      sx={[style, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
}
