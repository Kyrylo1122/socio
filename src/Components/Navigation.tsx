import * as React from "react";
import {
  List,
  ListItem,
  Paper,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import {
  PeopleAlt,
  Home,
  Chat,
  Bookmark as SaveIcon,
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
        p: { xs: 1, sm: 2 },
        color: "text.primary",
        ":hover": { color: "text.accent" },
        "&.active": {
          bgcolor: "background.paper",
        },
      }}
      component={Link}
      to={to}
    >
      {icon ? (
        <ListItemIcon sx={{ justifyContent: "center", color: "inherit" }}>
          {icon}
        </ListItemIcon>
      ) : null}
      {primary && <ListItemText title={primary} />}
      {children}{" "}
    </ListItem>
  );
}

const Navigation = ({ isHeader = false }: { isHeader?: boolean }) => {
  const { t } = useTranslation();
  return (
    <Paper sx={{ backgroundColor: "inherit" }} elevation={0}>
      <List
        aria-label="main navigation"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          flexDirection: isHeader ? "row" : "column",
        }}
      >
        <ListItemLink to="/" icon={<Home />}>
          {!isHeader ? t("navigation_homepage") : ""}
        </ListItemLink>
        <ListItemLink to="/contacts" icon={<PeopleAlt />}>
          {!isHeader ? t("navigation_contacts") : ""}
        </ListItemLink>
        <ListItemLink to="/chats" icon={<Chat />}>
          {!isHeader ? t("navigation_chats") : ""}
        </ListItemLink>
        <ListItemLink to="/saves" icon={<SaveIcon />}>
          {!isHeader ? t("navigation_saves") : ""}
        </ListItemLink>
      </List>
    </Paper>
  );
};

export default Navigation;
