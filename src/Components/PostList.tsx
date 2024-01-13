import { List, ListItem } from "@mui/material";
import PostCard from "./PostCard/PostCard";
import { IPostResponse } from "src/types";

const PostList = ({ posts }: { posts: IPostResponse[] }) => {
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {posts
        .map((post) => (
          <ListItem
            sx={{
              boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)",
              p: 0,
              borderRadius: 1,
            }}
            key={post.id}
          >
            <PostCard post={post} />
          </ListItem>
        ))
        .reverse()}
    </List>
  );
};
export default PostList;
