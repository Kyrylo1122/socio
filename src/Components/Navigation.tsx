import * as React from "react";
import List from "@mui/material/List";
import { Box } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";
import {
  BookmarkBorder as SaveIcon,
  Favorite,
  PeopleAlt,
  Home,
  Chat,
} from "@mui/icons-material";

import {
  NavLink as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  children?: string;
  primary?: string;
  to: string;
}

export const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  function Link(itemProps, ref) {
    return <RouterLink color="red" ref={ref} {...itemProps} role={undefined} />;
  }
);

function ListItemLink(props: ListItemLinkProps) {
  const { icon, to, primary, children } = props;

  return (
    <ListItem
      sx={{
        color: "text.primary",
        ":hover": { color: "text.accent" },
        "&.active": {
          bgcolor: "background.paper",
        },
      }}
      component={Link}
      to={to}
    >
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      {primary && <ListItemText title={primary} />}
      {children}{" "}
    </ListItem>
  );
}

const Navigation = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Paper sx={{ backgroundColor: "inherit" }} elevation={0}>
        <List aria-label="main navigation">
          <ListItemLink to="/" icon={<Home />}>
            {t("navigation_homepage")}
          </ListItemLink>
          <ListItemLink to="/contacts" icon={<PeopleAlt />}>
            {t("navigation_contacts")}
          </ListItemLink>
          <ListItemLink to="/chats" icon={<Chat />}>
            {t("navigation_chats")}
          </ListItemLink>
          <ListItemLink to="/saves" icon={<SaveIcon />}>
            {t("navigation_saves")}
          </ListItemLink>
          <ListItemLink to="/likes" icon={<Favorite />}>
            {t("navigation_likes")}
          </ListItemLink>
        </List>
      </Paper>
    </Box>
  );
};

export default Navigation;
