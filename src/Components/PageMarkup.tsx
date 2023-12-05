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
// import UserInfo from "src/Components/UserInfo";
import MouseImageOver from "src/Components/MouseImageOver";
import UpdateImageModalContent from "src/Components/UpdateImageModal";
import {
  useDeleteFile,
  useGetUserPosts,
  useUpdateUserInfo,
} from "src/lib/react-query/react-query";
import { toast } from "react-toastify";
import AvatarSkeleton from "src/Components/Skeleton/AvatarSkeleton";

import PostList from "src/Components/PostList";
import PostCreator from "src/Components/PostCreator";
import { createAvatarLink } from "src/utils/createAvatarLink";
import { Models } from "appwrite";
import { useUserContext } from "src/hooks/useUserContext";

interface IPageMarkUp {
  user: Models.Document;
}

const PageMarkUp = ({ user }: IPageMarkUp) => {
  const { t } = useTranslation();
  const { user: currentUser } = useUserContext();
  const currentUserPage = user.$id === currentUser.$id;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { data: posts } = useGetUserPosts(user.$id);
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
        {currentUserPage ? (
          <>
            {" "}
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
                  src={createAvatarLink(user.imageUrl, user.defaultCharacter)}
                  alt={user.name}
                />
              )}
            </MouseImageOver>
            {updateAvatarModal ? (
              <UpdateImageModalContent
                imageId={user.imageId}
                defaultImage={createAvatarLink(
                  user.imageUrl,
                  user.defaultCharacter
                )}
                open={updateAvatarModal}
                close={() => setUpdateAvatarModal(false)}
              />
            ) : null}
          </>
        ) : (
          <Avatar
            sx={{
              width: 150,
              height: 150,
              backgroundColor: "primary.accent",
              border: "2px solid white",
            }}
            src={createAvatarLink(user.imageUrl, user.defaultCharacter)}
            alt={user.name}
          />
        )}

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
            {currentUserPage ? (
              <Box
                onClick={openModal}
                sx={{
                  mb: 3,
                  p: 3,
                  backgroundColor: "background.paper",
                  borderRadius: 1,
                }}
              >
                <PostCreator
                  imageUrl={createAvatarLink(
                    user.imageUrl,
                    user.defaultCharacter
                  )}
                />
              </Box>
            ) : null}

            {posts && <PostList posts={posts.documents} />}
          </Box>
          <Box
            sx={{
              flex: 1,
              padding: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* <UserInfo userInfo={user.userInfo} /> */}
            <UserFriends />
          </Box>
        </Box>
      </Box>
      {currentUserPage ? (
        <Modal open={modalIsOpen} close={closeModal}>
          <CreatePost close={closeModal} />
        </Modal>
      ) : null}
    </Box>
  );
};

export default PageMarkUp;
