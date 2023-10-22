import { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  IconButton,
  Collapse,
  IconButtonProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import profileAvatar from "/usa.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = ({ image, desc, date, like }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded((state) => !state);
  };

  return (
    <Card
      sx={{
        width: "100%",
        backgroundColor: "inherit",
        color: "white",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={profileAvatar}
            sx={{ bgcolor: "red", color: "primary" }}
            aria-label="profile avatar"
          >
            R
          </Avatar>
        }
        title="Kyrylo Bereznov"
        subheader={date}
        sx={{ "& .MuiCardHeader-subheader": { color: "white" } }}
      />
      <CardContent>
        <Typography variant="body2" color="white">
          {desc}
        </Typography>
      </CardContent>
      <CardMedia component="img" height="350" image={image} alt="Paella dish" />

      <CardActions
        sx={{ display: "flex", alignItems: "center" }}
        disableSpacing
      >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography sx={{ p: 0, m: 0 }} paragraph>
          {like} people like it
        </Typography>

        <IconButton aria-label="share">
          <ShareIcon sx={{ color: "white" }} />
        </IconButton>
      </CardActions>

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

      <Collapse in={expanded} timeout="auto" unmountOnExit title="Comment">
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
