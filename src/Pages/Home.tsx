import { Box } from "@mui/material";

import Typography from "@mui/material/Typography";
import { users } from "@Assets/data/Users";
import AvatarGroup from "@mui/material/AvatarGroup";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import profileAvatar from "/usa.jpg";

import { Divider, Skeleton, TextField } from "@mui/material";
import { posts } from "@Assets/data/Posts";
import PostCard from "src/Components/PostCard";
import CreatePost from "src/Components/CreatePost";
import { useState } from "react";
import Modal from "src/Components/Modal";
import { useUserContext } from "src/context/AuthContext";
import { useTranslation } from "react-i18next";
import UserInfo from "src/Components/UserInfo";
import MouseImageOver from "src/Components/MouseImageOver";
import UpdateImageModalContent from "src/Components/UpdateImageModal";
import {
  useDeleteFile,
  useUpdateUserInfo,
} from "src/lib/react-query/react-query";
import { toast } from "react-toastify";
import Spinner from "src/Components/Spinner";

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
  const { user, isLoading, checkAuthUser } = useUserContext();
  const { mutateAsync: deleteFile, isPending } = useDeleteFile();
  const { mutateAsync: uploadUserInfo, isPending: isLoad } =
    useUpdateUserInfo();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const [updateAvatarModal, setUpdateAvatarModal] = useState(true);
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
  const deleteAvatarImage = async () => {
    if (!user.imageId) return toast.info(t("no_avatar_image"));
    try {
      await deleteFile(user.imageId);
      await uploadUserInfo({ imageId: null, imageUrl: null });
      await checkAuthUser();
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading) return <>loading</>;
  return (
    <Box
      sx={{
        width: "100%",
        color: "text.light",
      }}
    >
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
        <MouseImageOver
          onDelete={deleteAvatarImage}
          onEdit={() => setUpdateAvatarModal(true)}
        >
          {isLoad || isPending ? (
            <Skeleton
              variant="circular"
              width={150}
              height={150}
              sx={{ bgcolor: "primary.accent" }}
            />
          ) : (
            <Avatar
              sx={{
                width: 150,
                height: 150,
                backgroundColor: "primary.accent",
                border: "2px solid white",
              }}
              src={user.imageUrl}
              alt={user.name}
            />
          )}
        </MouseImageOver>
        {updateAvatarModal ? (
          <UpdateImageModalContent
            imageId={user.imageId}
            defaultImage={user.imageUrl}
            open={updateAvatarModal}
            close={() => setUpdateAvatarModal(false)}
          />
        ) : null}

        <Box sx={{ textAlign: "center", lineHeight: "1" }}>
          <Typography variant="h1" sx={{ fontSize: "36px" }}>
            {user.name}
          </Typography>
          <Typography variant="body1">{user.bio}</Typography>
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
            <UserInfo userInfo={user.userInfo} />
            <UserFriends />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
