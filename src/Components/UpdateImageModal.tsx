import { Box, Divider, Typography } from "@mui/material";
import Modal, { IBasicModal } from "./Modal";
import { useTranslation } from "react-i18next";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FileUploader from "./FileUploader";
import { useRef, useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useUploadAvatarImage } from "src/lib/react-query";
import AvatarEditor from "./ProfileAvatars/CustomAvatarEditor";
import dataURLtoFile from "src/utils/dataURLtoFile";
import { StyledBox, StyledBtn } from "./ui/StyledComponents";
import AvatarEditorType from "react-avatar-editor";

type IOmitModal = Omit<IBasicModal, "children">;
type ImageType = {
  defaultImage: string;
  imageId: string | null | undefined;
  id: string;

  name: string;
};
type IProp = IOmitModal & ImageType;

const UpdateImageModalContent = ({
  id,
  name,
  defaultImage,
  open,
  close,
}: IProp) => {
  const { t } = useTranslation();

  const [fileUrl, setFileUrl] = useState(defaultImage);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { mutateAsync: uploadAvatarImg } = useUploadAvatarImage();

  const Uploader = () => (
    <FileUploader setFileUrl={setFileUrl} onChange={setFile} />
  );
  const editor = useRef<AvatarEditorType>(null);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!editor.current) throw Error;

      const file = dataURLtoFile(
        editor?.current?.getImage().toDataURL(),
        "imageUrl"
      );

      await uploadAvatarImg({ id, name, file });

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
            <StyledBox component="label" mt={1}>
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
            <StyledBtn onClick={handleSubmit}>{t("share")}</StyledBtn>
          ) : (
            <Typography variant="body1">{t("update_image_footer")}</Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateImageModalContent;
