// // import navigation from "../routes/navigation";
// // import { NavLink } from "react-router-dom";

// const Navigation = () => {
//   return (
//     <nav>
//       <ul></ul>
//     </nav>
//   );
// };
// export default Navigation;
import * as React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import Typography from "@mui/material/Typography";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { PeopleAlt, Event, Home } from "@mui/icons-material";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
  itemProps,
  ref
) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItem component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const Navigation = () => {
  return (
    <Box>
      <Paper
        sx={{ borderRadius: 0, backgroundColor: "secondary" }}
        elevation={0}
      >
        <List aria-label="main navigation">
          <ListItemLink to="/" primary="Home" icon={<Home />} />
          <ListItemLink
            to="/contacts"
            primary="Contacts"
            icon={<PeopleAlt />}
          />
          <ListItemLink to="/drafts" primary="Events" icon={<Event />} />
        </List>
        <Divider />
        <List aria-label="secondary mailbox folders">
          <ListItemLink to="/trash" primary="Trash" />
          <ListItemLink to="/spam" primary="Spam" />
        </List>
      </Paper>
    </Box>
  );
};

export default Navigation;
