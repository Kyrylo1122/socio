import { List, ListItem, Typography } from "@mui/material";
import PostCard from "./PostCard";
import { Models } from "appwrite";

interface IPostList {
  posts: Models.Document[];
}
const PostList = ({ posts }: IPostList) => {
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {posts.length ? (
        posts.map((post) => (
          <ListItem
            sx={{
              boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)",
              p: 0,
              borderRadius: 1,
            }}
            key={post.$id}
          >
            <PostCard
              id={post.$id}
              desc={post.caption}
              image={post.imageUrl}
              date={post.$createdAt}
              likes={post.likes}
            />
          </ListItem>
        ))
      ) : (
        <Typography>
          You do not have any post. Let's create the first!
        </Typography>
      )}
    </List>
  );
};
export default PostList;
