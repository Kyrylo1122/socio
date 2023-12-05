import { Avatar, Box, Typography } from "@mui/material";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { createAvatarLink } from "src/utils/createAvatarLink";
import { format } from "date-fns";

interface IPostComment {
  comment: Models.Document;
}
const PostComment = ({ comment }: IPostComment) => {
  const {
    user: { $id, imageUrl, defaultCharacter, name },
    commentId,
    createdAt,
    updated,
    body,
  } = comment;
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Link to={`/${$id}`}>
          <Avatar
            src={createAvatarLink(imageUrl, defaultCharacter)}
            alt={name}
          />
        </Link>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" color="secondary">
            {name}
          </Typography>
          <Typography variant="body2">{body}</Typography>
          <Typography sx={{ fontSize: 10 }}>
            {updated ? "Updated" : null}
            {format(createdAt, "dd MMM HH:mm")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PostComment;
