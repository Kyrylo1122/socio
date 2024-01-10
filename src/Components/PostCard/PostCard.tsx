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

interface IPostCardProps {
  user: Models.Document;
  id: string;
  image?: string;
  caption?: string;
  createdAt: string;
  likes: Models.Document;
  comments: string[];
  location: string;
  tags: string[];
}
const PostCard = ({
  user,
  id,
  image,
  caption,
  location,
  tags,
  createdAt,
  likes,
}: IPostCardProps) => {
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
      await deletePost(id);
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
      {currentUser.$id === user.$id ? (
        <Box sx={{ position: "absolute", right: 10 }}>
          <PlaygroundSpeedDial actions={actions} direction="left" />
        </Box>
      ) : null}

      <PostCardHeader
        imageUrl={user.imageId}
        defaultCharacter={user.defaultCharacter}
        name={user.name}
        date={createdAt}
        location={location}
      />
      <Typography variant="body2" color="text.light">
        {caption}
      </Typography>
      <ChipsArray chipData={tags} />
      <CardMedia
        component="img"
        sx={{ height: 350, objectFit: "contain" }}
        image={image}
        alt="Paella dish"
      />
      <CommentForm handleClick={handleCreateComment} />
      <SharePost />
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
      <Modal open={editPostModal} close={closeModal}>
        <CreatePost
          imageReadOnly={true}
          defaultCaption={caption || ""}
          defaultLocation={location || ""}
          defaultTags={tags || []}
          defaultCreatedAt={createdAt}
          defaultImageUrl={image || ""}
          handleSubmit={handleEditPost}
          close={closeModal}
          isPending={false}
        />
      </Modal>
    </Card>
  );
};

export default PostCard;
