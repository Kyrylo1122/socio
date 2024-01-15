import { List, ListItem, Typography } from "@mui/material";
import PostCard from "./PostCard/PostCard";
import { IPostResponse } from "src/types";
import { useTranslation } from "react-i18next";

const PostList = ({ posts }: { posts: IPostResponse[] }) => {
  const { t } = useTranslation();
  const reversePosts = posts.reverse();
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {reversePosts?.length ? (
        reversePosts.map((post) => (
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
      ) : (
        <Typography sx={{ textAlign: "center" }}>{t("no_posts")} </Typography>
      )}
    </List>
  );
};
export default PostList;
