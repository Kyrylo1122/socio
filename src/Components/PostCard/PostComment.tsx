import { Avatar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { createAvatarLink } from "src/utils/createAvatarLink";
import { IComment } from "src/types";
import { formatDate } from "src/utils/formatDate";
import { useDeleteComment } from "src/lib/react-query";
import PlaygroundSpeedDial from "../ui/SpeedDial";
import { useTranslation } from "react-i18next";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

interface IPostComment {
  setCommentValue: (value: string) => void;
  postId: string;
  comment: IComment;
}
const PostComment = ({ postId, comment, setCommentValue }: IPostComment) => {
  const { t } = useTranslation();

  const { mutateAsync: deleteComment } = useDeleteComment();
  const {
    user: { uid, name, photoUrl, defaultCharacter },

    createdAt,
    text,
  } = comment;
  const handleDelete = () => {
    try {
      deleteComment({ postId, data: comment });
    } catch (error) {
      console.error(error);
    }
  };
  const handleAnswer = () => {
    setCommentValue(`@${name},`);
  };
  const actions = [
    {
      icon: <DeleteForeverIcon />,
      name: t("delete"),
      onClick: handleDelete,
    },
    {
      icon: <QuestionAnswerIcon />,
      name: t("answer"),
      onClick: handleAnswer,
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Link to={`/${uid}`}>
          <Avatar
            src={createAvatarLink({ photoUrl, defaultCharacter })}
            aria-label={name}
            sx={{ width: 60, height: 60 }}
          />
        </Link>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" color="secondary">
            {name}
          </Typography>
          <Typography variant="body2">{text.value}</Typography>
          <Typography sx={{ fontSize: 10, fontStyle: "italic" }}>
            {formatDate(createdAt.seconds)}
          </Typography>
        </Box>

        <Box sx={{ position: "absolute", right: 10 }}>
          <PlaygroundSpeedDial actions={actions} direction="left" />
        </Box>
      </Box>
    </Box>
  );
};

export default PostComment;
