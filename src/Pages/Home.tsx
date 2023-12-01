import { Box } from "@mui/material";

import Typography from "@mui/material/Typography";
import { users } from "@Assets/data/Users";
import AvatarGroup from "@mui/material/AvatarGroup";

import Avatar from "@mui/material/Avatar";

import { Divider } from "@mui/material";
import CreatePost from "src/Components/CreatePost";
import { useState } from "react";
import Modal from "src/Components/Modal";
import { useTranslation } from "react-i18next";
import UserInfo from "src/Components/UserInfo";
import MouseImageOver from "src/Components/MouseImageOver";
import UpdateImageModalContent from "src/Components/UpdateImageModal";
import {
  useDeleteFile,
  useUpdateUserInfo,
} from "src/lib/react-query/react-query";
import { toast } from "react-toastify";
import AvatarSkeleton from "src/Components/Skeleton/AvatarSkeleton";

import { useUserContext } from "src/hooks/useUserContext";
import PostList from "src/Components/PostList";
import PostCreator from "src/Components/PostCreator";

// $collectionId
// :
// "653ec2f742926176e790"
// $createdAt
// :
// "2023-11-13T19:57:52.271+00:00"
// $databaseId
// :
// "653d5ca4d34be06380fa"
// $id
// :
// "65527fc041809b37c95e"
// $permissions
// :
// (3) ['read("user:6547d8b6e3a98e5cc79c")', 'update("user:6547d8b6e3a98e5cc79c")', 'delete("user:6547d8b6e3a98e5cc79c")']
// $updatedAt
// :
// "2023-11-13T19:57:52.271+00:00"
// caption
// :
// "All good, but not always"
// creator
// :
// {name: 'Pedro', accountId: '6547d8b6e3a98e5cc79c', email: 'ko@ma.com', bio: null, imageId: null, …}
// imageId
// :
// "65527fbfc16340f26b51"
// imageUrl
// :
// "https://cloud.appwrite.io/v1/storage/buckets/653ec1b13a369ef1507f/files/65527fbfc16340f26b51/preview?project=653d5c81e6f55aa196c8"
// likes
// :
// []
// location
// :
// "Ryga"
// save
// :
// []
// tags
// :
// (3) ['all', 'new', 'tags']

const Home = () => {
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user, checkAuthUser } = useUserContext();
  const { mutateAsync: deleteFile, isPending } = useDeleteFile();
  const { mutateAsync: uploadUserInfo, isPending: isLoad } =
    useUpdateUserInfo();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const [updateAvatarModal, setUpdateAvatarModal] = useState(false);
  const UserFriends = () => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
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
      </Box>
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
  return (
    <Box
      sx={{
        width: "100%",
        color: "text.light",
        position: "relative",
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
            <AvatarSkeleton />
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
          <Typography variant="h1">{user.name}</Typography>
          <Typography variant="body1">{user.bio}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", lg: "row" },
            width: "100%",
          }}
        >
          <Box sx={{ flex: 2, padding: 2 }}>
            <Box
              onClick={openModal}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "background.paper",
                borderRadius: 1,
              }}
            >
              <PostCreator imageUrl={user.imageUrl} />
            </Box>

            <PostList />
          </Box>
          <Box
            sx={{
              flex: 1,
              padding: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <UserInfo userInfo={user.userInfo} />
            <UserFriends />
          </Box>
        </Box>
      </Box>
      <Modal open={modalIsOpen} close={closeModal}>
        <CreatePost close={closeModal} />
      </Modal>
    </Box>
  );
};

export default Home;
