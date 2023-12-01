import { List, ListItem, Typography } from "@mui/material";
import { useGetPosts } from "src/lib/react-query/react-query";
import PostCard from "./PostCard";

const PostList = () => {
  const { data, isLoading } = useGetPosts();

  if (isLoading) return <>Loading</>;
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {data ? (
        data.documents.map((post) => (
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
