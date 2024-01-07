import { useEffect, useRef, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useChatContext } from "src/hooks/useChatContext";
import {
  Timestamp,
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "src/firebase/config";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useUserContext } from "src/hooks/useUserContext";
import { v4 as uuid } from "uuid";
import SimpleInputForm from "./SimpleInputForm";
import AvatarImage from "./AvatarImage";
import { formatDate } from "src/utils/formatDate";

import NoChatMessages from "./NoChatMessages";
import { Delete } from "@mui/icons-material";
import { useUpdateChats, useUpdateUserChats } from "src/lib/react-query";

const ChatUI = () => {
  const { t } = useTranslation();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data } = useChatContext();
  const { user: currentUser } = useUserContext();
  const { mutateAsync: updateUserChats } = useUpdateUserChats();
  const { mutateAsync: updateChats } = useUpdateChats();
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  const ref = useRef();

  useEffect(() => {
    ref.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = async (text: { value: string }) => {
    if (text.value.trim() === "") {
      toast.info(t("empty_field_error"));
    }
    updateChats({
      id: data.chatId,
      data: {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      },
    });
    updateUserChats({
      id: currentUser.uid,
      data: {
        [data.chatId]: {
          lastMessage: { text },
          date: serverTimestamp(),
        },
      },
    });
    updateUserChats({
      id: data.user.uid,
      data: {
        [data.chatId]: {
          lastMessage: { text },
          date: serverTimestamp(),
        },
      },
    });
  };

  return (
    <>
      {data.chatId !== "null" ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: " calc(100vh - 88px)",
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
          <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }} ref={ref}>
            {messages.length ? (
              messages.map((message) => (
                <Message key={message.id} message={message} />
              ))
            ) : (
              <NoChatMessages />
            )}
          </Box>
          <Box sx={{ p: 2, backgroundColor: "background.default" }}>
            <SimpleInputForm handleClick={handleSend} isComment={false} />
          </Box>
        </Box>
      ) : (
        <NoChatMessages />
      )}
    </>
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
  const { data } = useChatContext();

  const isBot = message.senderId !== user.uid;
  const [isVisibleDelete] = useState(true);
  const { mutateAsync: updateChats } = useUpdateChats();

  const handleDeleteMessage = () => {
    updateChats({
      id: data.chatId,
      data: {
        messages: arrayRemove(message),
      },
    });
  };
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
        {isVisibleDelete ? (
          <Box>
            <Button variant="contained" onClick={handleDeleteMessage}>
              <Delete />
            </Button>
          </Box>
        ) : null}
      </Paper>
    </Box>
  );
};

export default ChatUI;
