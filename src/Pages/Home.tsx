import { Box } from "@mui/joy";
import Typography from "@mui/material/Typography";
import { users } from "@Assets/data/Users";
import AvatarGroup from "@mui/material/AvatarGroup";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";

import { Divider } from "@mui/material";
import { posts } from "@Assets/data/Posts";
import PostCard from "@Components/PostCard";

const UserFriends = () => {
  return (
    <>
      <Typography variant="h4">User friends</Typography>
      <Divider sx={{ backgroundColor: "white" }} />
      <AvatarGroup
        total={users.length}
        variant="square"
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "10px",
          gap: "20px",
          "& .MuiAvatar-root": { width: 56, height: 56 },
        }}
      >
        {users.map((user) => (
          <Avatar
            key={user.id}
            alt={user.username}
            src={user.profilePicture}
            sx={{ width: 56, height: 56 }}
            variant="square"
          />
        ))}
      </AvatarGroup>
    </>
  );
};

const userInfoContent = [
  { key: "city", value: "Kharkiv" },
  { key: "country", value: "Ukraine" },
  { key: "relations", value: "Have girlfriend" },
];
const UserInfo = () => (
  <Box>
    <Typography variant="h4">User info</Typography>
    <Divider sx={{ backgroundColor: "white" }} />{" "}
    <List>
      {userInfoContent.map(({ key, value }) => (
        <ListItem key={key} sx={{ pt: 0, pb: 0 }}>
          {key} : {value}
        </ListItem>
      ))}
    </List>
  </Box>
);

const PostList = () => {
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {posts.map((post) => (
        <ListItem
          sx={{
            boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)",
            p: 0,
            borderRadius: 1,
          }}
          key={post.id}
        >
          <PostCard
            desc={post.desc}
            image={post.photo}
            date={post.date}
            like={post.like}
          />
        </ListItem>
      ))}
    </List>
  );
};

const Home = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <img
          className="background-img"
          src="./nature.jpg"
          alt="background profile page"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          mt: "-100px",
        }}
      >
        <img className="avatar-img" src="./usa.jpg" alt="avatar-img" />

        <Box sx={{ textAlign: "center", lineHeight: "1" }}>
          <Typography variant="h1" sx={{ fontSize: "36px" }}>
            Kyrylo Bereznov
          </Typography>
          <Typography variant="body1">Welcome everybody on my page</Typography>
        </Box>
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ flex: 2, padding: "15px" }}>
            <PostList />
          </Box>

          <Box sx={{ flex: 1, padding: "15px" }}>
            <UserInfo />
            <UserFriends />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
