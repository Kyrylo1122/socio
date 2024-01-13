import { Avatar, CardHeader } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { createAvatarLink } from "src/utils/createAvatarLink";
import { formatDate } from "src/utils/formatDate";

interface IPostCardHeader {
  photoUrl: string | null;
  name: string;
  date?: Timestamp;
  defaultCharacter: number;
  location?: string;
}
const PostCardHeader = ({
  photoUrl,
  defaultCharacter,
  name,
  date,
  location,
}: IPostCardHeader) => {
  const subHeader = `${location ? location + ", " : ""}${
    date ? formatDate(date.seconds) : ""
  }`;
  return (
    <CardHeader
      avatar={
        <Avatar
          src={createAvatarLink({ photoUrl, defaultCharacter })}
          aria-label={name}
          sx={{ width: 70, height: 70 }}
        />
      }
      title={name}
      subheader={subHeader}
      sx={{
        "& .MuiCardHeader-subheader": {
          color: "text.light",
          fontStyle: "italic",
          fontWeight: "200",
        },
      }}
    />
  );
};

export default PostCardHeader;
