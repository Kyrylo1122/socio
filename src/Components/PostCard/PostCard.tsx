import { useState } from "react";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";

import { useTranslation } from "react-i18next";

import PostStats from "../PostStats";
import { Models } from "appwrite";
import { useCreateComment, useDeletePost } from "src/lib/react-query";
import CommentForm from "../SimpleInputForm";

import PostCardHeader from "./PostCardHeader";
import PlaygroundSpeedDial from "../SpeedDial";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreatePost from "../CreatePost";
import Modal from "../Modal";
import ChipsArray from "../ChipArray";
import { useUserContext } from "src/hooks/useUserContext";
import PostSkeleton from "../Skeleton/PostSkeleton";
import SharePost from "../SharePost";
import { IPostResponse, IUser, IUserShortInfo } from "src/types";

const PostCard = ({ post }: { post: IPostResponse }) => {
  const { id, caption, photoUrl, tags, location, creator, createdAt } = post;
  const { t } = useTranslation();
  const { user: currentUser } = useUserContext();
  const [expanded, setExpanded] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const closeModal = () => setEditPostModal(false);
  const { mutateAsync: deletePost, isPending } = useDeletePost();
  const { mutateAsync: createComment, isPending: isCreatingComment } =
    useCreateComment();
  //   const { mutateAsync: editPost, isPending: isPendingEdit } = useUpdatePost();

  const handleExpandClick = () => {
    setExpanded((state) => !state);
  };
  const handleDeletePost = async () => {
    try {
      await deletePost({
        id: currentUser.uid,
        post,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreateComment = async (value: { body: string }) => {
    const newValue = {
      postId: id,
      userId: user.$id,
      body: value.body,
    };
    try {
      await createComment(newValue);
    } catch (error) {
      console.error(error);
    }
  };

  const actions = [
    {
      icon: <DeleteForeverIcon />,
      name: t("delete"),
      onClick: handleDeletePost,
    },
    {
      icon: <EditIcon />,
      name: t("edit"),
      onClick: () => setEditPostModal(true),
    },
  ];
  if (isPending) return <PostSkeleton />;
  return (
    <Card
      sx={{
        width: "100%",
        backgroundImage: "none",
        position: "relative",
        p: 1,
      }}
    >
      {currentUser.uid === creator.uid ? (
        <Box sx={{ position: "absolute", right: 10 }}>
          <PlaygroundSpeedDial actions={actions} direction="left" />
        </Box>
      ) : null}

      <PostCardHeader
        photoUrl={creator.photoUrl}
        defaultCharacter={creator.defaultCharacter}
        name={creator.name}
        date={createdAt}
        location={location}
      />
      <Typography variant="body2" color="text.light">
        {caption}
      </Typography>
      <ChipsArray chipData={tags} />
      {photoUrl ? (
        <CardMedia
          component="img"
          sx={{ height: 350, objectFit: "contain" }}
          image={photoUrl}
          alt="Paella dish"
        />
      ) : null}

      {/* <CommentForm isComment={true} handleClick={handleCreateComment} /> */}
      {/* <SharePost />
      <Box sx={{ display: "flex", p: 1, gap: 4, justifyContent: "center" }}>
        <PostStats
          expanded={expanded}
          commentsLength={1}
          handleExpandClick={handleExpandClick}
          likes={likes}
          postId={id}
        />
      </Box> */}
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
