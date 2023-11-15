import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import { users } from "@Assets/data/Users";
import AvatarGroup from "@mui/material/AvatarGroup";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import profileAvatar from "/usa.jpg";

import { Divider, TextField } from "@mui/material";
import { posts } from "@Assets/data/Posts";
import PostCard from "src/Components/PostCard";
import { useTranslation } from "react-i18next";
import CreatePost from "src/Components/CreatePost";
import { useState } from "react";
import Modal from "src/Components/Modal";

const userInfoContent = [
  { key: "city", value: "Kharkiv" },
  { key: "country", value: "Ukraine" },
  { key: "status", value: "Have girlfriend" },
];

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
const PostCreater = () => (
  <Box
    sx={{
      display: "flex",
      gap: 3,
      width: "100%",
      alignItems: "flex-end",
    }}
  >
    <Avatar
      sx={{ width: 56, height: 56 }}
      src={profileAvatar}
      aria-label="profile avatar"
    />

    <TextField
      variant="standard"
      fullWidth
      sx={{ outline: "none" }}
      placeholder="What's in your mind Kyrylo?"
    />
  </Box>
);

const Home = () => {
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const UserInfo = () => (
    <Box>
      <Typography variant="h4">{t("user_info")}</Typography>
      <Divider />{" "}
      <List>
        {userInfoContent.map(({ key, value }) => (
          <ListItem key={key} sx={{ pt: 0, pb: 0 }}>
            {t(key)} : {value}
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const UserFriends = () => {
    return (
      <>
        <Typography variant="h4">{t("user_friends")}</Typography>
        <Divider />
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
  return (
    <Box
      sx={{
        width: "100%",
        color: "text.light",
      }}
    >
      <Box sx={{ display: "inline-block" }}></Box>

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
          <Typography variant="body1">{t("greeting")}</Typography>
        </Box>
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ flex: 2, padding: "15px" }}>
            <Box
              onClick={openModal}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "background.paper",
                borderRadius: 1,
              }}
            >
              <PostCreater />
            </Box>

            <Modal open={modalIsOpen} close={closeModal}>
              <CreatePost />
            </Modal>
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
