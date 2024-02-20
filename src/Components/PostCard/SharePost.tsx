import { Box, Popover } from "@mui/material";
import {
  TelegramShareButton,
  TelegramIcon,
  FacebookIcon,
  FacebookMessengerShareButton,
  EmailIcon,
  EmailShareButton,
} from "react-share";

const SharePost = ({
  id,
  anchorEl,
  handleClose,
  open,
}: {
  id?: string;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
  open: boolean;
}) => {
  const shareUrl = window.location.href;
  const title = "Check this cool post";

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box sx={{ p: 1, display: "flex", gap: 1 }}>
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <FacebookMessengerShareButton
          appId="appId"
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <FacebookIcon size={32} round />
        </FacebookMessengerShareButton>
        <EmailShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </Box>
    </Popover>
  );
};

export default SharePost;
