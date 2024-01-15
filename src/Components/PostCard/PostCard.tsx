import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Collapse,
  List,
  ListItem,
  Divider,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import PostStats from "../PostStats";
import { Models } from "appwrite";
import {
  useCreateComment,
  useDeletePost,
  useGetPostReactions,
} from "src/lib/react-query";
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
import { Timestamp } from "firebase/firestore";
import PostComment from "../PostComment";

const PostCard = ({ post }: { post: IPostResponse }) => {
  const { id, caption, photoUrl, tags, location, creator, createdAt } = post;
  const { t } = useTranslation();
  const { user: currentUser } = useUserContext();
  const [expanded, setExpanded] = useState(true);
  const [editPostModal, setEditPostModal] = useState(false);
  const closeModal = () => setEditPostModal(false);
  const { mutateAsync: deletePost, isPending } = useDeletePost();
  const { mutateAsync: createComment, isPending: isCreatingComment } =
    useCreateComment();
  const { data, isPending: isPendingComments } = useGetPostReactions(id);
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
  const handleCreateComment = async (comment: { value: string }) => {
    const { name, defaultCharacter, photoUrl, uid } = currentUser;
    const data = {
      user: {
        name,
        defaultCharacter,
        photoUrl,
        uid,
      },
      text: comment,
      createdAt: Timestamp.now(),
    };
    try {
      await createComment({ postId: id, data });
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
        position: "relative",

        display: "flex",
        flexDirection: "column",
        gap: 1,

        p: 2,

        width: "100%",
        backgroundImage: "none",
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
        createdAt={createdAt}
        location={location}
      />
      <Typography variant="body1" color="text.light">
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

      <CommentForm isComment={true} handleClick={handleCreateComment} />
      {/* <SharePost /> */}
      <Box sx={{ display: "flex", p: 1, gap: 4, justifyContent: "center" }}>
        <PostStats
          expanded={expanded}
          commentsLength={data?.comments.length}
          handleExpandClick={handleExpandClick}
          likes={data?.likes}
          postId={id}
        />
      </Box>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        title={t("comments")}
      >
        <CardContent>
          <List>
            {data?.comments.length ? (
              data?.comments.map((postComment) => {
                return (
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                    key={postComment.createdAt.seconds}
                  >
                    <PostComment comment={postComment} />
                    <Divider sx={{ mt: 1, color: "red", width: "100%" }} />
                  </ListItem>
                );
              })
            ) : (
              <Typography>{t("no_comments")}</Typography>
            )}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
