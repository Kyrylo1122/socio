import { MouseEventHandler, useState } from "react";

import { Box, Button, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useTranslation } from "react-i18next";
import {
  useAddSavePost,
  useDeleteSavePost,
  useLikePost,
} from "src/lib/react-query";
import { useUserContext } from "src/hooks/useUserContext";
import {
  ExpandLess as ExpandLessIcon,
  Bookmark as SaveIcon,
} from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { IPostResponse } from "src/types";
import useSavesContext from "src/hooks/useSavesContext";
import { toast } from "react-toastify";
import SharePost from "./SharePost";
import { ExpandMore } from "./ui/StyledComponents";

const IconBtnStyle = { borderRadius: "50%", m: 0, p: 2, minWidth: "auto" };

interface IPostStats {
  likes: string[];
  expanded: boolean;
  handleExpandClick: MouseEventHandler<HTMLButtonElement> | undefined;
  commentsLength?: number;
  post: IPostResponse;
}

const PostStats = ({
  likes,
  expanded,
  handleExpandClick,
  commentsLength,
  post,
}: IPostStats) => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const { posts } = useSavesContext();

  const { mutateAsync: likePost } = useLikePost();

  const [isLiked, setIsLiked] = useState(() => likes?.includes(user.uid));
  const isSaved = posts.map((post) => post.id)?.includes(post.id);

  const [countLikes, setCountLikes] = useState(likes?.length);
  const { mutateAsync: savePost } = useAddSavePost();
  const { mutateAsync: deleteSave } = useDeleteSavePost();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLikeClick = async () => {
    try {
      if (isLiked) {
        await likePost({
          postId: post.id,
          arrayOfLikes: arrayRemove(user.uid),
        });
      } else {
        await likePost({ postId: post.id, arrayOfLikes: arrayUnion(user.uid) });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onSaveClick = async () => {
    try {
      if (isSaved) {
        await deleteSave({
          userId: user.uid,
          post,
        });
        return toast.warn(t("remove_saved_post"));
      }

      await savePost({ userId: user.uid, post });
      return toast.success(t("saved_post"));
    } catch (error) {
      console.error(error);
    }
  };
  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        variant="text"
        onClick={async () => {
          setIsLiked((state: boolean) => !state);
          setCountLikes((state: number) => (isLiked ? state - 1 : state + 1));
          await onLikeClick();
        }}
        sx={{
          ...IconBtnStyle,
          color: `${isLiked ? "primary.accent" : "primary.grey"}`,
        }}
      >
        <FavoriteIcon sx={{ color: "inherit" }} />
        {countLikes} {t("liked_it")}
      </Button>

      <Box sx={{ display: "flex" }}>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? <ExpandLessIcon /> : null}
          <Box sx={{ display: "flex", gap: 1 }}>
            <ChatBubbleOutlineIcon />
            <Typography sx={{ display: "inline" }}>{commentsLength}</Typography>
          </Box>
        </ExpandMore>
      </Box>
      <IconButton
        sx={IconBtnStyle}
        id={id}
        aria-label="share"
        onClick={handleClick}
      >
        <ShareIcon sx={{ color: "text.dark" }} />
      </IconButton>
      <SharePost
        open={open}
        id={id}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />

      <IconButton
        sx={{
          ...IconBtnStyle,
          color: `${isSaved ? "primary.accent" : ""}`,
        }}
        onClick={onSaveClick}
      >
        <SaveIcon color="inherit" />
      </IconButton>
    </>
  );
};

export default PostStats;
