import { Avatar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { createAvatarLink } from "src/utils/createAvatarLink";
import { IComment } from "src/types";
import { formatDate } from "src/utils/formatDate";

interface IPostComment {
  comment: IComment;
}
const PostComment = ({ comment }: IPostComment) => {
  const {
    user: { uid, name, photoUrl, defaultCharacter },

    createdAt,
    text,
  } = comment;
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Link to={`/${uid}`}>
          <Avatar
            src={createAvatarLink({ photoUrl, defaultCharacter })}
            aria-label={name}
            sx={{ width: 60, height: 60 }}
          />
        </Link>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" color="secondary">
            {name}
          </Typography>
          <Typography variant="body2">{text.value}</Typography>
          <Typography sx={{ fontSize: 10, fontStyle: "italic" }}>
            {formatDate(createdAt.seconds)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PostComment;
