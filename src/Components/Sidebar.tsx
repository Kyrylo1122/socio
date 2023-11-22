import { Navigation } from "../Components";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";

import { users } from "@Assets/data/Users";
import { AvatarGroup, Badge, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const UserFriends = () => {
  const onlineUsers = users.filter((user) => user.isOnline);
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 400,
          color: "text.primary",
          p: "10px 0",
        }}
      >
        {t("online_friends")}
      </Typography>
      <Divider />
      <AvatarGroup
        total={onlineUsers.length}
        max={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: 2,
          gap: 1,
        }}
      >
        {onlineUsers.map((user) => (
          <Box
            key={user.id}
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Badge
              key={user.id}
              color="success"
              overlap="circular"
              badgeContent=" "
              variant="dot"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Avatar
                key={user.id}
                alt={user.username}
                src={user.profilePicture}
              />
            </Badge>
            <Typography
              variant="body2"
              sx={{ display: "inline", color: "text.primary", fontWeight: 500 }}
            >
              {user.username}
            </Typography>
          </Box>
        ))}
      </AvatarGroup>
    </Box>
  );
};
const Sidebar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "fixed",
        backgroundColor: "background.default",
        // width: "500px",
      }}
    >
      <Navigation />
      <Divider />
      <UserFriends />
    </Box>
  );
};

export default Sidebar;
