import { Box, Avatar, TextField } from "@mui/material";

import TagIcon from "@mui/icons-material/Tag";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

interface IPostCreator {
  imageUrl: string;
}
const PostCreator = ({ imageUrl }: IPostCreator) => (
  <Box>
    <Box
      sx={{
        display: "flex",
        gap: 3,
        width: "100%",
        alignItems: "flex-end",
      }}
    >
      <Avatar
        sx={{ width: 56, height: 56 }}
        src={imageUrl}
        aria-label="profile avatar"
      />

      <TextField
        variant="standard"
        fullWidth
        sx={{ outline: "none" }}
        placeholder="What's in your mind Kyrylo?"
      />
    </Box>
    <Box
      sx={{
        mt: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        color: "primary.accent",
      }}
    >
      <AddPhotoAlternateIcon color="inherit" />
      <AddLocationAltIcon color="inherit" />
      <TagIcon color="inherit" />
    </Box>
  </Box>
);

export default PostCreator;
