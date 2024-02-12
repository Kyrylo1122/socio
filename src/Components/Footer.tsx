import { GitHub, LinkedIn } from "@mui/icons-material";
import { Box, Typography, List, ListItem, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const Link = styled(NavLink)(({ theme }) => ({
  transition: theme.transitions.create("transform"),

  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.white
      : theme.palette.secondary.main,
  "&:hover,&:focus": {
    color: theme.palette.secondary.main,
    transform: "scale(1.2)",
  },
}));
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "absolute",
        bottom: 0,
        bgcolor: "background.paper",

        pt: 2,

        borderTop: "1px solid",
        borderColor: "primary.dark",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{ fontSize: "16px", display: "flex", alignItems: "center", gap: 1 }}
      >
        Socio made by{" "}
        <Typography sx={{ fontSize: "16px", color: "primary.accent" }}>
          Kyrylo Bereznov
        </Typography>
      </Typography>
      <List
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          gap: 0,
          p: 0,
          m: 0,
        }}
      >
        <ListItem sx={{ width: "auto", p: 1 }}>
          <Link to="https://github.com/Kyrylo1122/">
            <GitHub sx={{ color: "inherit" }} />
          </Link>
        </ListItem>
        <ListItem sx={{ width: "auto", p: 1 }}>
          <Link to="https://www.linkedin.com/in/kyrylo-bereznov-40b39818a/">
            {" "}
            <LinkedIn sx={{ color: "inherit" }} />
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Footer;
