import {
  Box,
  Button,
  CardMedia,
  Collapse,
  Divider,
  Fade,
  TextField,
  Typography,
} from "@mui/material";

import FileUploader from "../FileUploader";
import { Controller, useForm } from "react-hook-form";

import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

import { useRef, useState } from "react";
import { INewPost, INewPostForm } from "src/types";
import TagIcon from "@mui/icons-material/Tag";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
// import Spinner from "./Spinner";
import { useUserContext } from "src/hooks/useUserContext";
import ChipsArray from "./ChipArray";
import TagsForm from "../TagsForm";

import useThemeContext from "src/hooks/useThemeContext";
import { useTranslation } from "react-i18next";
import PostCardHeader from "../PostCard/PostCardHeader";
import { useCreatePost, useCreatePostReaction } from "src/lib/react-query";
import { Timestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { IconBox, StyledButton } from "../ui/StyledComponents";

interface ICreatePost {
  close: () => void;
}

const CreatePost = ({ close }: ICreatePost) => {
  const { t } = useTranslation();
  const locationRef = useRef<HTMLDivElement>();

  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [editImage, setEditImage] = useState(false);
  const [isOpenLocation, setOpenLocation] = useState(false);
  const [isOpenTags, setOpenTags] = useState(false);
  const { user } = useUserContext();
  const { mode } = useThemeContext();

  const [chipData, setChipData] = useState<string[]>([]);

  const cleanImage = () => setFileUrl("");
  const toggleLocation = () => {
    if (!isOpenLocation)
      locationRef.current?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    setOpenLocation((state) => !state);
  };
  const toggleTags = () => setOpenTags((state) => !state);
  const { mutateAsync: createNewPost } = useCreatePost();
  const { mutateAsync: createPostReaction } = useCreatePostReaction();

  const {
    register,
    handleSubmit: handleFormSubmit,
    control,
  } = useForm<INewPost>();

  const onSubmit = ({ caption, location, photoUrl }: INewPostForm) => {
    const postId = uuid();

    try {
      const data = {
        id: postId,
        location: isOpenLocation ? location : "",
        tags: isOpenTags ? chipData : [],
        photoUrl: photoUrl ? photoUrl : null,
        caption,
        creator: {
          uid: user.uid,

          photoUrl: user.photoUrl,
          name: user.name,
          defaultCharacter: user.defaultCharacter,
        },
        createdAt: Timestamp.now(),
      };
      createNewPost({
        id: user.uid,
        data,
        file: photoUrl,
      });
      createPostReaction({ postId });
      close();
    } catch (error) {
      console.error(error);
    }
  };
  const ImageController = () => (
    <Controller
      name="photoUrl"
      control={control}
      render={({ field: { onChange } }) => (
        <FileUploader setFileUrl={setFileUrl} onChange={onChange} />
      )}
    />
  );
  return (
    <Box
      sx={{
        position: "relative",
        p: { xs: 1, md: 3 },

        minHeight: 100,
        maxHeight: "80vh",
        overflow: "auto",
        msOverflowStyle: "none",
        scrollbarWidth: "none",

        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box mb={2}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {t("create_post")}
        </Typography>
        <StyledButton
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: 30, sm: 40 },
            width: { xs: 30, sm: 40 },

            minWidth: { xs: 30, sm: 40 },
            position: "absolute",
            top: 10,
            right: 10,
            borderRadius: "50%",
            bgcolor: mode === "light" ? "primary.dark" : "primary.main",
            color: "primary.white",
            "&:hover,&:focus": {
              bgcolor: "primary.dark",
            },
          }}
          onClick={close}
        >
          <ClearIcon sx={{ width: 30, height: 30 }} />
        </StyledButton>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          width: "100%",
        }}
        onSubmit={handleFormSubmit(onSubmit)}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          <PostCardHeader
            photoUrl={user.photoUrl}
            defaultCharacter={user.defaultCharacter}
            name={user.name}
            location=""
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            width: "100%",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              gap: 2,
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Collapse sx={{ width: "100%" }} in={isOpenLocation}>
              <Box
                ref={locationRef}
                sx={{
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                }}
              >
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{
                    outline: "none",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "text.accent",
                    },
                  }}
                  label={t("location")}
                  placeholder="Add your location"
                  {...register("location")}
                />
              </Box>
            </Collapse>
            <Collapse
              sx={{ width: "100%" }}
              in={Boolean(fileUrl)}
              unmountOnExit
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                  position: "relative",
                }}
              >
                <Box>
                  {fileUrl ? (
                    <CardMedia
                      onMouseOver={() => setEditImage(true)}
                      component="img"
                      height="250"
                      width="500"
                      image={fileUrl}
                      alt="Post photo"
                      sx={{ objectFit: "contain" }}
                    />
                  ) : null}
                </Box>
                {editImage ? (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,

                      color: "primary.accent",
                      textAlign: "center",

                      cursor: "pointer",
                    }}
                  >
                    <IconBox component="label">
                      <EditIcon sx={{ width: 30, height: 30 }} />

                      <ImageController />
                    </IconBox>
                    <IconBox component={"span"} onClick={cleanImage}>
                      <ClearIcon sx={{ width: 30, height: 30 }} />
                    </IconBox>
                  </Box>
                ) : null}
              </Box>
            </Collapse>
            <TextField
              multiline
              minRows={3}
              variant="filled"
              fullWidth
              label={t("caption")}
              sx={{
                "& .MuiFormLabel-root": {
                  color: "text.accent",
                  "&.Mui-focused": {
                    color: "text.accent",
                  },
                },
              }}
              placeholder={t("what_in_mind", { val: user.name })}
              {...register("caption")}
            />

            <Collapse sx={{ width: "100%" }} in={isOpenTags}>
              <Box
                sx={{
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                }}
              >
                <TagsForm chipData={chipData} setChipData={setChipData} />
              </Box>
            </Collapse>

            <ChipsArray chipData={chipData} setChipData={setChipData} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", tb: "center" },
            alignContent: "center",
            flexWrap: { xs: "wrap", tb: "nowrap" },
          }}
        >
          <IconBox
            component="label"
            sx={{
              display: "flex",
              fontWeight: "500",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.contrast",
              textTransform: "uppercase",
              textAlign: "center",
              fontSize: { xs: "10px", sm: "12px", md: "14px" },
            }}
          >
            <AddPhotoAlternateIcon color="secondary" />
            {t(fileUrl ? "change_photo" : "add_photo")}
            <ImageController />
          </IconBox>

          <StyledButton
            onClick={toggleLocation}
            sx={{ color: "primary.contrast" }}
          >
            <AddLocationAltIcon color="secondary" />
            {t(isOpenLocation ? "remove_location" : "add_location")}
          </StyledButton>
          <StyledButton onClick={toggleTags} sx={{ color: "primary.contrast" }}>
            <TagIcon color="secondary" />
            {t(isOpenTags ? "remove_tags" : "add_tags")}
          </StyledButton>
        </Box>

        <Fade in={true} unmountOnExit>
          <Box sx={{ width: "100%" }}>
            <Button
              fullWidth
              type="submit"
              variant="text"
              sx={{
                p: 2,
                background: "Background",
                color: "text.white",
                "&:hover,&:focus": {
                  backgroundColor: "primary.accent",
                },
              }}
            >
              {t("share")}
            </Button>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default CreatePost;
