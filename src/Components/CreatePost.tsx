import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Collapse,
  Fade,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import profileAvatar from "/usa.jpg";
import FileUploader from "./FileUploader";
import { Controller, useForm } from "react-hook-form";

import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

import { useState } from "react";
import { styled } from "@mui/material/styles";
import * as Yup from "yup";
import { useCreatePost } from "src/lib/react-query/react-query";
import { INewPost } from "src/types";
import TagIcon from "@mui/icons-material/Tag";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import Spinner from "./Spinner";
import { useUserContext } from "src/hooks/useUserContext";

const schema = Yup.object({
  caption: Yup.string().max(2200),
  location: Yup.string().max(2200),
  tags: Yup.string(),
  imageUrl: Yup.mixed().nullable(),
}).required();

type DataType = Omit<INewPost, "userId">;
const IconBox = styled(Box)(({ theme }) => ({
  p: theme.spacing(1),

  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("transform"),
  cursor: "pointer",
  "&:hover,&:focus": {
    backgroundColor: theme.palette.background.translucent,
    transform: "scale(1.4)",
  },
}));

const CreatePost = ({ close }: { close: () => void }) => {
  const [fileUrl, setFileUrl] = useState<string>();
  const [editImage, setEditImage] = useState(false);
  const [isOpenLocation, setOpenLocation] = useState(false);
  const [isOpenTags, setOpenTags] = useState(false);
  const { user } = useUserContext();

  const { mutateAsync: createNewPost, isPending } = useCreatePost();
  const cleanImage = () => setFileUrl("");
  const toggleLocation = () => setOpenLocation((state) => !state);
  const toggleTags = () => setOpenTags((state) => !state);

  const { register, handleSubmit, control } = useForm<DataType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (value: DataType) => {
    try {
      const newValue = { ...value, userId: user.id };
      console.log("newValue: ", newValue);
      await createNewPost(newValue);
      close();
    } catch (error) {
      console.error(error);
    }
  };

  const ImageController = () => (
    <Controller
      name="imageUrl"
      control={control}
      render={({ field: { onChange } }) => (
        <FileUploader setFileUrl={setFileUrl} onChange={onChange} />
      )}
    />
  );
  if (isPending) return <Spinner />;
  return (
    <Box
      sx={{
        backgroundImage: "none",
        p: 3,
        minHeight: 100,
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <Avatar
            sx={{ width: 56, height: 56 }}
            src={profileAvatar}
            aria-label="profile avatar"
          />
          <Box
            sx={{ flex: 1, display: "flex", gap: 2, flexDirection: "column" }}
          >
            <TextField
              variant="standard"
              fullWidth
              sx={{ outline: "none" }}
              placeholder="What's in your mind Kyrylo?"
              {...register("caption")}
            />
            <Collapse in={isOpenLocation}>
              <Box
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
                  label="Location"
                  placeholder="Add your location"
                  {...register("location")}
                />
                <IconBox
                  sx={{
                    position: "absolute",
                    right: 0,
                    p: 0,
                    "&:hover": { color: "primary.accent" },
                  }}
                  onClick={() => setOpenLocation(false)}
                >
                  <ClearIcon sx={{ width: 30, height: 30 }} />
                </IconBox>
              </Box>
            </Collapse>
            <Collapse in={isOpenTags}>
              <Box
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
                  placeholder="Cat, dogs ..."
                  label="Tags"
                  {...register("tags")}
                />
                <IconBox
                  sx={{
                    position: "absolute",
                    right: 0,

                    p: 0,
                    "&:hover": { color: "primary.accent" },
                  }}
                  onClick={() => setOpenTags(false)}
                >
                  <ClearIcon sx={{ width: 30, height: 30 }} />
                </IconBox>
              </Box>
            </Collapse>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
          <Box component="label" sx={{ cursor: "pointer" }}>
            <AddPhotoAlternateIcon color="secondary" /> Add photo{" "}
            <ImageController />
          </Box>
          <Box
            component="label"
            sx={{ cursor: "pointer" }}
            onClick={toggleLocation}
          >
            <AddLocationAltIcon color="secondary" />
            Add location
          </Box>
          <Box
            component="label"
            sx={{ cursor: "pointer" }}
            onClick={toggleTags}
          >
            <TagIcon color="secondary" />
            Add tags
          </Box>
          <Fade in={!fileUrl} {...{ timeout: 500 }}>
            <Box>
              {" "}
              <Button
                type="submit"
                variant="text"
                sx={{
                  pr: 2,
                  pl: 2,
                  color: "text.white",

                  background: "Background",
                  "&:hover,&:focus": {
                    backgroundColor: "primary.accent",
                  },
                }}
              >
                Share here
              </Button>
            </Box>
          </Fade>
        </Box>
        <Collapse in={Boolean(fileUrl)}>
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
              <CardMedia
                onMouseOver={() => setEditImage(true)}
                component="img"
                height="350"
                width="500"
                image={fileUrl}
                alt="Post photo"
                sx={{ objectFit: "contain" }}
              />
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

        <Fade in={Boolean(fileUrl)} unmountOnExit>
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
              Share here
            </Button>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default CreatePost;
