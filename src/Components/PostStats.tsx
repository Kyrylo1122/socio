import {
  Box,
  Button,
  IconButton,
  IconButtonProps,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useTranslation } from "react-i18next";
import { useLikePost, useSavePost } from "src/lib/react-query";
import { useUserContext } from "src/hooks/useUserContext";
import { MouseEventHandler, useState } from "react";
import {
  ExpandLess as ExpandLessIcon,
  BookmarkBorder as SaveIcon,
} from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { styled } from "@mui/material/styles";
import { arrayRemove, arrayUnion } from "firebase/firestore";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
interface IPostStats {
  likes: string[];
  postId: string;
  expanded: boolean;
  handleExpandClick: MouseEventHandler<HTMLButtonElement> | undefined;
  commentsLength?: number;
}

const PostStats = ({
  likes,
  postId,
  expanded,
  handleExpandClick,
  commentsLength,
}: IPostStats) => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const { mutateAsync: likePost } = useLikePost();

  const [isLiked, setIsLiked] = useState(() => likes?.includes(user.uid));
  const [countLikes, setCountLikes] = useState(likes?.length);
  const { mutateAsync: savePost } = useSavePost();
  const onLikeClick = async () => {
    try {
      if (isLiked) {
        await likePost({ postId, arrayOfLikes: arrayRemove(user.uid) });
      } else {
        await likePost({ postId, arrayOfLikes: arrayUnion(user.uid) });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onSaveClick = async () => {
    try {
      await savePost({ userId: user.uid, postId });
    } catch (error) {
      console.error(error);
    }
  };
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
          p: 0,
          m: 0,
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
      <IconButton aria-label="share">
        <ShareIcon sx={{ color: "text.dark" }} />
      </IconButton>
      <IconButton onClick={onSaveClick}>
        <SaveIcon />
      </IconButton>
    </>
  );
};

export default PostStats;
