import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  Popover,
} from "@mui/material";
import AvatarImage from "./AvatarImage";
import { AvatarImageProps } from "src/types";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { VideocamOff, PhoneDisabled } from "@mui/icons-material";
import { formatDate } from "src/utils/formatDate";
import shortenString from "src/utils/shortenString";
import MoreIcon from "@mui/icons-material/MoreVert";

type UserChatItemMarkupProp = AvatarImageProps & {
  lastMessage?: string;
  lastMessageDate: number;
};

const UserChatItemMarkup = ({
  name,
  photoUrl,
  defaultCharacter,
  lastMessage,
  lastMessageDate,
}: UserChatItemMarkupProp) => {
  const { t } = useTranslation();
  const lastMessageSubTitle = lastMessage
    ? `${shortenString(lastMessage)} ${formatDate(lastMessageDate)}`
    : t("no_messages");

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Card
      sx={{
        p: { md: "4px 8px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "background.paper",

        width: "100%",
        cursor: "pointer",
        "&:hover,&:focus": { transform: "scale(1.05)" },
      }}
    >
      <CardHeader
        sx={{ p: { xs: 0.5, md: 1 }, display: "flex", alignItems: "center" }}
        avatar={
          <AvatarImage
            name={name}
            photoUrl={photoUrl}
            defaultCharacter={defaultCharacter}
            sx={{
              width: 50,
              height: 50,
            }}
          />
        }
        title={name}
        subheader={lastMessageSubTitle}
      />
      <Box sx={{ display: "flex", gap: 1, pr: 1 }}>
        <IconButton
          sx={{
            display: { xs: "flex", md: "none" },
            p: 0,
          }}
          size="large"
          aria-label="show more"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
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
        <Box sx={{ p: 1 }}>
          {" "}
          <DisabledCall />
        </Box>
      </Popover>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <DisabledCall />
      </Box>
    </Card>
  );
};

const DisabledCall = () => {
  const { t } = useTranslation();

  return (
    <>
      <Button
        sx={{ p: 0, minWidth: 0 }}
        variant="text"
        onClick={() => toast.warn(t("video_call"))}
      >
        <VideocamOff sx={{ color: "primary.accent" }} />
      </Button>
      <Button
        sx={{ p: 0, minWidth: 0 }}
        variant="text"
        onClick={() => toast.warn(t("phone_call"))}
      >
        <PhoneDisabled sx={{ color: "primary.accent" }} />
      </Button>
    </>
  );
};

export default UserChatItemMarkup;
