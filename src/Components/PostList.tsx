import { List, ListItem, Typography } from "@mui/material";
import PostCard from "./PostCard/PostCard";
import { IPostResponse } from "src/types";
import { useTranslation } from "react-i18next";
import { useDeletePost, useDeleteSavePost } from "src/lib/react-query";
import { useUserContext } from "src/hooks/useUserContext";
import sortPosts from "src/utils/sortPosts";

const PostList = ({
  posts,
  isSaves = false,
}: {
  isSaves?: boolean;
  posts: IPostResponse[];
}) => {
  const { t } = useTranslation();
  const { mutateAsync: deletePost } = useDeletePost();
  const { mutateAsync: deleteSave } = useDeleteSavePost();

  const { user: currentUser } = useUserContext();

  const handleDeleteSave = async (post: IPostResponse) => {
    try {
      await deleteSave({
        userId: currentUser.uid,
        post,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeletePost = async (post: IPostResponse) => {
    try {
      await deletePost({
        id: currentUser.uid,
        post,
      });
      await handleDeleteSave(post);
    } catch (error) {
      console.error(error);
    }
  };
  const sortedPosts = sortPosts(posts);

  return (
    <List
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",

        gap: 3,
      }}
    >
      {sortedPosts?.length ? (
        sortedPosts.map((post) => (
          <ListItem
            sx={{
              boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)",
              p: 0,
              borderRadius: 1,
              maxWidth: "800px",
            }}
            key={post.id}
          >
            <PostCard
              post={post}
              deletePost={isSaves ? handleDeleteSave : handleDeletePost}
            />
          </ListItem>
        ))
      ) : (
        <Typography sx={{ textAlign: "center" }}>{t("no_posts")} </Typography>
      )}
    </List>
  );
};
export default PostList;
