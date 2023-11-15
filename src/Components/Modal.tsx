import * as React from "react";
import Box from "@mui/material/Box";

import { Modal as BasicModal } from "@mui/material";

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
interface IBasicModal {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IBasicModal> = ({ open, close, children }) => {
  return (
    <div>
      <BasicModal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </BasicModal>
    </div>
  );
};

export default Modal;
