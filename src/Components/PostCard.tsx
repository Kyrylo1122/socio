import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Collapse,
  Button,
  Divider,
  ListItem,
  List,
  Box,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import PostStats from "./PostStats";
import { Models } from "appwrite";
import {
  useCreateComment,
  useDeletePost,
} from "src/lib/react-query/react-query";
import CommentForm from "./CommentForm";
import PostComment from "./PostComment";
import { IUserResponse } from "src/types";
import PostCardHeader from "./PostCardHeader";

interface IPostCardProps {
  user: Models.Document;
  id: string;
  image?: string;
  desc?: string;
  date: string;
  likes: Models.Document;
  comments: string[];
}
const PostCard = ({
  user,
  id,
  image,
  desc,
  date,
  likes,
  comments,
}: IPostCardProps) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const { mutateAsync: deletePost, isPending } = useDeletePost();
  const { mutateAsync: createComment, isPending: isCreatingComment } =
    useCreateComment();

  const handleExpandClick = () => {
    setExpanded((state) => !state);
  };
  const handleDeletePost = async () => {
    try {
      await deletePost(id);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreateComment = async (comment: string) => {
    try {
      await createComment({
        postId: id,
        arrayOfComments: [...comments, comment],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        backgroundImage: "none",
        position: "relative",
        p: 1,
      }}
    >
      <Button
        variant="contained"
        sx={{ top: 10, right: 10, color: "black", position: "absolute" }}
        onClick={handleDeletePost}
      >
        {isPending ? "on deleting" : "DELETE"}
      </Button>
      <PostCardHeader
        imageUrl={user.imageId}
        defaultCharacter={user.defaultCharacter}
        name={user.name}
        date={date}
      />
      <CardContent>
        <Typography variant="body2" color="text.light">
          {desc}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        sx={{ height: 350, objectFit: "contain" }}
        image={image}
        alt="Paella dish"
      />
      <CommentForm handleClick={handleCreateComment} />
      <Box sx={{ display: "flex", p: 1, gap: 4, justifyContent: "center" }}>
        <PostStats
          expanded={expanded}
          commentsLength={1}
          handleExpandClick={handleExpandClick}
          likes={likes}
          postId={id}
        />
      </Box>
      {/* <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        title={t("comments")}
      >
        <CardContent>
          <List>
            {comments.map((postComment) => {
              const comment = JSON.parse(postComment);
              return (
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                  key={comment.commentId}
                >
                  <PostComment key={comment} comment={comment} />
                  <Divider sx={{ color: "red", width: "100%" }} />
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Collapse> */}
    </Card>
  );
};

export default PostCard;
