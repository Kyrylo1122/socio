import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  styled,
} from "@mui/material";
import Modal, { IBasicModal } from "./Modal";
import { useTranslation } from "react-i18next";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FileUploader from "./FileUploader";
import { useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import {
  useDeleteFile,
  useUpdateUserInfo,
  useUploadFile,
} from "src/lib/react-query/react-query";
import { useUserContext } from "src/context/AuthContext";

const StyledBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  transition: theme.transitions.create("all"),
}));
const StyledBtn = styled(Button)(({ theme }) => ({
  transition: theme.transitions.create("all"),
  color: theme.palette.secondary.main,
  "&:hover,&:focus": {
    transform: "scale(1.3)",
  },
}));

type IOmitModal = Omit<IBasicModal, "children">;
type ImageType = { defaultImage: string; imageId: string | null | undefined };
type IProp = IOmitModal & ImageType;

const UpdateImageModalContent = ({
  defaultImage,
  imageId,
  open,
  close,
}: IProp) => {
  const { t } = useTranslation();
  const [fileUrl, setFileUrl] = useState(defaultImage);
  const [file, setFile] = useState<File | null>(null);
  const { mutateAsync: uploadFile, isPending } = useUploadFile();
  const { mutateAsync: deleteFile, isPending: isLoading } = useDeleteFile();
  const { mutateAsync: uploadUserInfo, isPending: isLoad } =
    useUpdateUserInfo();

  const { checkAuthUser } = useUserContext();
  const handleClick = async () => {
    if (!file) return;
    try {
      if (imageId) {
        await deleteFile(imageId);
      }

      const uploadedFile = await uploadFile(file);

      if (!uploadedFile) throw Error;

      await uploadUserInfo({
        imageUrl: uploadedFile.imageUrl,
        imageId: uploadedFile.id,
      });
      await checkAuthUser();
      close();
    } catch (error) {
      console.error(error);
    }
  };

  const Uploader = () => (
    <FileUploader setFileUrl={setFileUrl} onChange={setFile} />
  );
  if (isPending || isLoading || isLoad) return <>Loading...</>;
  return (
    <Modal sx={{ width: "300px" }} open={open} close={close}>
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Typography variant="body1">{t("update_image_header")}</Typography>
            <Box>
              <StyledBtn onClick={() => close()}>
                <CloseOutlinedIcon />
              </StyledBtn>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {fileUrl && (
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  backgroundColor: "primary.accent",
                  border: "2px solid white",
                }}
                src={fileUrl}
                alt="avatar"
              />
            )}
            {fileUrl ? (
              <StyledBox
                sx={{
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
                component="label"
                mt={1}
              >
                {t("update_image")} <Uploader />
              </StyledBox>
            ) : (
              <StyledBox
                component="label"
                sx={{
                  p: 3,
                  borderRadius: 1,
                  border: "1px dashed",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {t("update_image_body")}
                <Box mt={1}>
                  <InsertPhotoIcon />
                </Box>
                <Uploader />
              </StyledBox>
            )}
          </Box>
          <Divider />
          <Box sx={{ p: 3, textAlign: "center" }}>
            {fileUrl ? (
              <StyledBtn onClick={handleClick}>Share</StyledBtn>
            ) : (
              <Typography variant="body1">
                {t("update_image_footer")}
              </Typography>
            )}
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default UpdateImageModalContent;
