import { Avatar, Box, Typography } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { createAvatarLink } from "src/utils/createAvatarLink";
import { formatDate } from "src/utils/formatDate";

interface IPostCardHeader {
  photoUrl: string | null;
  name: string;
  createdAt?: Timestamp;
  defaultCharacter: number;
  location?: string;
}
const PostCardHeader = ({
  photoUrl,
  defaultCharacter,
  name,
  createdAt,
  location,
}: IPostCardHeader) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        gap: 1,
        pb: 1,
        borderBottom: "1px solid",
        borderColor: "secondary.grey",
      }}
    >
      <Avatar
        src={createAvatarLink({ photoUrl, defaultCharacter })}
        aria-label={name}
        sx={{ width: 70, height: 70 }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">{name}</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {location ? (
            <Typography sx={{ fontWeight: "100" }} variant="body2">
              {location},
            </Typography>
          ) : null}

          {createdAt ? (
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              {formatDate(createdAt?.seconds)}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};
//  color: "text.light",
//           fontStyle: "italic",
//           fontWeight: "200",
export default PostCardHeader;
