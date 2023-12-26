import { Box, Button, Divider, Typography, styled } from "@mui/material";
import Modal, { IBasicModal } from "./Modal";
import { useTranslation } from "react-i18next";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FileUploader from "./FileUploader";
import { useRef, useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import {
  useDeleteFile,
  useUpdateUserInfo,
  useUploadFile,
} from "src/lib/react-query";
import AvatarEditor from "./CustomAvatarEditor";
import dataURLtoFile from "src/utils/dataURLtoFile";
import { useUserContext } from "src/hooks/useUserContext";
import { updateDatabase } from "src/firebase/api-firebase";

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
  const { user } = useUserContext();
  const [fileUrl, setFileUrl] = useState(defaultImage);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { mutateAsync: uploadFile } = useUploadFile();
  const { mutateAsync: deleteFile } = useDeleteFile();
  const { mutateAsync: uploadUserInfo } = useUpdateUserInfo();

  const Uploader = () => (
    <FileUploader setFileUrl={setFileUrl} onChange={setFile} />
  );
  const editor = useRef(null);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!editor.current) throw Error;

      const file = dataURLtoFile(
        editor.current.getImage().toDataURL(),
        "imageUrl"
      );

      await uploadFile({ id: user.uid, name: user.name, file });

      close();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      close();
    }
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <Modal sx={{ width: "300px" }} open={open} close={close}>
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
          {file && <AvatarEditor file={file} ref={editor} />}
          {file ? (
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
            <StyledBtn onClick={handleSubmit}>Share</StyledBtn>
          ) : (
            <Typography variant="body1">{t("update_image_footer")}</Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateImageModalContent;
