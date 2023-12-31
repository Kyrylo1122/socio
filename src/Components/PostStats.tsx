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
import { Models } from "appwrite";
import { useUserContext } from "src/hooks/useUserContext";
import { MouseEventHandler, useState } from "react";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  BookmarkBorder as SaveIcon,
} from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { styled } from "@mui/material/styles";

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
  likes: Models.Document;
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
  let arrayOfLikes = likes.map((likedUser: Models.Document) => likedUser.$id);
  const [isLiked, setIsLiked] = useState(() => arrayOfLikes.includes(user.$id));
  const [countLikes, setCountLikes] = useState(likes.length);
  const { mutateAsync: savePost } = useSavePost();

  const onLikeClick = async () => {
    if (arrayOfLikes.includes(user.$id)) {
      arrayOfLikes = arrayOfLikes.filter(
        (usersId: string) => usersId !== user.$id
      );
    } else {
      arrayOfLikes.push(user.$id);
    }
    try {
      await likePost({ postId, arrayOfLikes });
    } catch (error) {
      console.error(error);
    }
  };
  const onSaveClick = async () => {
    try {
      await savePost({ userId: user.$id, postId });
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

      <Box>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? <ExpandLessIcon /> : null}
          <ChatBubbleOutlineIcon />
          <Typography sx={{ display: "inline" }}>
            commentsLength {"commentsLength"}
          </Typography>
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
