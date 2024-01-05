import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useChatContext } from "src/hooks/useChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "src/firebase/config";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useUserContext } from "src/hooks/useUserContext";
import { v4 as uuid } from "uuid";
import SimpleInputForm from "./SimpleInputForm";
import AvatarImage from "./AvatarImage";
import { formatDate } from "src/utils/formatDate";

const ChatUI = () => {
  const { t } = useTranslation();

  const [messages, setMessages] = useState([
    {
      date: { seconds: 1, nanoseconds: 2 },
      id: "string",
      senderId: "string",
      text: { value: "value string" },
    },
    {
      date: { seconds: 2, nanoseconds: 23 },
      id: "string2",
      senderId: "string",
      text: { value: "Hi there!" },
    },
  ]);
  const { data } = useChatContext();
  const { user: currentUser } = useUserContext();
  const handleSend = async (text: { value: string }) => {
    if (text.value.trim() === "") {
      toast.info(t("empty_field_error"));
    }
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <Box
      sx={{
        height: " calc(100vh - 88px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          gap: 2,
          p: 3,
          display: "flex",

          width: "100%",
          alignItems: "center",
          bgcolor: "background.paper",
        }}
      >
        <AvatarImage
          sx={{ width: 75, height: 75 }}
          photoUrl={data.user.photoUrl}
          name={data.user.displayName}
          defaultCharacter={data.user.defaultCharacter}
        />
        <Typography variant="h2">{data.user.displayName}</Typography>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Box>
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <SimpleInputForm handleClick={handleSend} isComment={false} />
      </Box>
    </Box>
  );
};

interface IMessage {
  date: { seconds: number; nanoseconds: number };
  id: string;
  senderId: string;
  text: { value: string };
}

const Message = ({ message }: { message: IMessage }) => {
  const { user } = useUserContext();
  const isBot = message.senderId !== user.uid;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          backgroundColor: isBot ? "primary.light" : "secondary.light",
        }}
      >
        <Typography variant="body1">{message.text.value}</Typography>
        <Typography variant="body2">
          {formatDate(message?.date?.seconds * 1000)}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatUI;
