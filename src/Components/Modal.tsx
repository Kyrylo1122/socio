import * as React from "react";
import { Box } from "@mui/material";

import { Modal as BasicModal } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
};
export interface IBasicModal {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const Modal: React.FC<IBasicModal> = ({ sx = [], open, close, children }) => {
  return (
    <BasicModal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={[style, ...(Array.isArray(sx) ? sx : [sx])]}>{children}</Box>
    </BasicModal>
  );
};

export default Modal;
