import { Box, Avatar as AvatarMui } from "@mui/material";

import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";

import { Divider } from "@mui/material";
import CreatePost from "src/Components/CreatePost";
import { useState } from "react";
import Modal from "src/Components/Modal";
import { useTranslation } from "react-i18next";
import UserInfo from "src/Components/UserInfo";
import MouseImageOver from "src/Components/MouseImageOver";
import UpdateImageModalContent from "src/Components/UpdateImageModal";
import { useDeleteAvatarImage, useGetUserPosts } from "src/lib/react-query";
import { toast } from "react-toastify";
import AvatarSkeleton from "src/Components/Skeleton/AvatarSkeleton";

import PostList from "src/Components/PostList";
import PostCreator from "src/Components/PostCreator";
import { createAvatarLink } from "src/utils/createAvatarLink";
import { useUserContext } from "src/hooks/useUserContext";
import { IUser } from "src/types";
import Spinner from "./Spinner";
import AvatarImage from "./AvatarImage";
import PostSkeleton from "./Skeleton/PostSkeleton";
import { DocumentData } from "firebase/firestore";

const PageMarkUp = ({
  user,
  friends,
}: {
  user: IUser;
  friends: DocumentData[] | undefined;
}) => {
  const { t } = useTranslation();
  const { user: currentUser } = useUserContext();
  const currentUserPage = user?.uid === currentUser?.uid;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { data: posts, isPending: isLoadPosts } = useGetUserPosts(user.uid);
  const { mutateAsync: deleteAvatarImg, isPending } = useDeleteAvatarImage();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const [updateAvatarModal, setUpdateAvatarModal] = useState(false);

  const deleteAvatarImage = async () => {
    if (!user.photoUrl) return toast.info(t("no_avatar_image"));
    try {
      await deleteAvatarImg({ id: user.uid });
    } catch (error) {
      console.error(error);
    }
  };

  const UserFriends = () => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4">{t("user_friends")}</Typography>
        <Divider />
        <AvatarGroup
          total={friends?.length}
          variant="square"
          max={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "10px",
            gap: "20px",
            "& .MuiAvatar-root": { width: 56, height: 56 },
          }}
        >
          {friends?.map((user) => (
            <AvatarMui
              key={user.uid}
              alt={user.name}
              src={createAvatarLink({
                photoUrl: user.photoUrl,
                defaultCharacter: user.defaultCharacter,
              })}
              sx={{ width: 56, height: 56 }}
              variant="square"
            />
          ))}
        </AvatarGroup>
      </Box>
    );
  };
  const Avatar = () => (
    <AvatarImage
      photoUrl={user.photoUrl}
      defaultCharacter={user.defaultCharacter}
      name={user.name}
      sx={{
        width: 150,
        height: 150,
      }}
    />
  );
  if (!user) return <Spinner />;
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
            <MouseImageOver
              onDelete={deleteAvatarImage}
              onEdit={() => setUpdateAvatarModal(true)}
            >
              {isPending ? <AvatarSkeleton /> : <Avatar />}
            </MouseImageOver>
            {updateAvatarModal ? (
              <UpdateImageModalContent
                id={user.uid}
                name={user.name}
                imageId={user.photoUrl}
                defaultImage={createAvatarLink({
                  photoUrl: user.photoUrl,
                  defaultCharacter: user.defaultCharacter,
                })}
                open={updateAvatarModal}
                close={() => setUpdateAvatarModal(false)}
              />
            ) : null}
          </>
        ) : (
          <Avatar />
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
                  name={user.name}
                  imageUrl={createAvatarLink({
                    photoUrl: user.photoUrl,
                    defaultCharacter: user.defaultCharacter,
                  })}
                />
              </Box>
            ) : null}
            {isLoadPosts && !posts ? (
              <PostSkeleton />
            ) : (
              <PostList posts={posts?.posts} />
            )}
          </Box>
          <Box
            sx={{
              flex: 1,
              padding: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <UserInfo
              id={user.uid}
              city={user.city}
              country={user.country}
              status={user.status}
            />
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
