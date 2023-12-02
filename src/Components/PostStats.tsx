import { Button, CardActions, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useTranslation } from "react-i18next";
import { useLikePost } from "src/lib/react-query/react-query";
import { Models } from "appwrite";
import { useUserContext } from "src/hooks/useUserContext";
import { useState } from "react";

interface IPostStats {
  likes: Models.Document;
  postId: string;
}

const PostStats = ({ likes, postId }: IPostStats) => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const { mutateAsync: likePost } = useLikePost();
  let arrayOfLikes = likes.map((likedUser: Models.Document) => likedUser.$id);
  const [isLiked, setIsLiked] = useState(() => arrayOfLikes.includes(user.$id));
  const [countLikes, setCountLikes] = useState(likes.length);

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
  return (
    <CardActions sx={{ display: "flex", alignItems: "center" }} disableSpacing>
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
      <IconButton aria-label="share">
        <ShareIcon sx={{ color: "text.dark" }} />
      </IconButton>
    </CardActions>
  );
};

export default PostStats;
