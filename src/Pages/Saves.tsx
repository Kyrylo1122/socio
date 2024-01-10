import { List, ListItem, Typography } from "@mui/material";
import { useUserContext } from "src/hooks/useUserContext";
import { useGetSaves } from "src/lib/react-query";
import { useTranslation } from "react-i18next";
import PostCard from "src/Components/PostCard/PostCard";

const Saves = () => {
  const { t } = useTranslation();

  const { user } = useUserContext();
  const { data, isPending } = useGetSaves(user.uid);

  if (isPending) return <>Loading...</>;
  if (!data?.documents || data?.documents.length === 0)
    return <Typography variant="h2">{t("do_not_have_saves")}</Typography>;
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {data?.documents.map(({ $id, post, user }) => (
        <ListItem
          sx={{
            boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)",
            p: 0,
            borderRadius: 1,
          }}
          key={$id}
        >
          <PostCard
            user={user}
            id={post.$id}
            desc={post.caption}
            image={post.imageUrl}
            date={post.$createdAt}
            likes={post.likes}
            comments={post.comments}
          />
        </ListItem>
      ))}
    </List>
  );
  //   return <PostList posts={data.documents} user={user} />;
};

export default Saves;
