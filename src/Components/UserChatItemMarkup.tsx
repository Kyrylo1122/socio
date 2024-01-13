import { Box, Button, Card, CardHeader } from "@mui/material";
import AvatarImage from "./AvatarImage";
import { AvatarImageProps } from "src/types";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { VideocamOff, PhoneDisabled } from "@mui/icons-material";
import { formatDate } from "src/utils/formatDate";
import shortenString from "src/utils/shortenString";

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
    : "No messages";

  return (
    <Card
      sx={{
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
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
      </Box>
    </Card>
  );
};

export default UserChatItemMarkup;
