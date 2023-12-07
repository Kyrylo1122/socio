import { Avatar, CardHeader } from "@mui/material";
import { createAvatarLink } from "src/utils/createAvatarLink";
import { formatDate } from "src/utils/formatDate";
interface IPostCardHeader {
  imageUrl: string | null;
  name: string;
  date: string;
  defaultCharacter: number;
}
const PostCardHeader = ({
  imageUrl,
  defaultCharacter,
  name,
  date,
}: IPostCardHeader) => {
  return (
    <CardHeader
      avatar={
        <Avatar
          src={createAvatarLink(imageUrl, defaultCharacter)}
          aria-label={name}
        />
      }
      title={name}
      subheader={formatDate(date)}
      sx={{ "& .MuiCardHeader-subheader": { color: "text.light" } }}
    />
  );
};

export default PostCardHeader;
