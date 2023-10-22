import { Navigation } from "../Components";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

import { users } from "@Assets/data/Users";
import { AvatarGroup, Badge, Typography } from "@mui/material";

const UserFriends = () => {
  const onlineUsers = users.filter((user) => user.isOnline);

  return (
    <>
      <Typography
        variant="h2"
        sx={{ fontSize: "24px", color: "white", p: "10px 0" }}
      >
        Online friends
      </Typography>
      <Divider sx={{ backgroundColor: "white" }} />
      <AvatarGroup
        total={onlineUsers.length}
        max={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: "10px",
          gap: "5px",
        }}
      >
        {onlineUsers.map((user) => (
          <Box
            key={user.id}
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            {" "}
            <Badge
              key={user.id}
              color="primary"
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
              sx={{ display: "inline", color: "white" }}
            >
              {user.username}
            </Typography>
          </Box>
        ))}
      </AvatarGroup>
    </>
  );
};
const Sidebar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "500px",
        backgroundColor: "primary",
        color: "white",
      }}
      className="sidebar"
    >
      <Navigation />
      <Divider />
      <UserFriends />
    </Box>
  );
};

export default Sidebar;
