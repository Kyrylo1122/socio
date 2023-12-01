import { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Collapse,
  IconButtonProps,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import profileAvatar from "/usa.jpg";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostStats from "./PostStats";
import { Models } from "appwrite";
import { useDeletePost } from "src/lib/react-query/react-query";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface IPostCardProps {
  id: string;
  image?: string;
  desc?: string;
  date: string;
  likes: Models.Document;
}
const PostCard = ({ id, image, desc, date, likes }: IPostCardProps) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const { mutateAsync: deletePost, isPending } = useDeletePost();
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

  return (
    <Card
      sx={{
        width: "100%",
        backgroundImage: "none",
        position: "relative",
      }}
    >
      <Button
        variant="contained"
        sx={{ top: 10, right: 10, color: "black", position: "absolute" }}
        onClick={handleDeletePost}
      >
        {isPending ? "on deleting" : "DELETE"}
      </Button>
      <CardHeader
        avatar={
          <Avatar src={profileAvatar} aria-label="profile avatar">
            R
          </Avatar>
        }
        title="Kyrylo Bereznov"
        subheader={date}
        sx={{ "& .MuiCardHeader-subheader": { color: "text.light" } }}
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

      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
        <Typography paragraph sx={{ display: "inline-block" }}>
          Coments:
        </Typography>
      </ExpandMore>
      <PostStats likes={likes} postId={id} />
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        title={t("comments")}
      >
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
