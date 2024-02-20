import { useEffect, useRef, useState } from "react";
import { Box, Typography, Paper, Button, List, ListItem } from "@mui/material";
import { useChatContext } from "src/hooks/useChatContext";
import {
  Timestamp,
  arrayRemove,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useUserContext } from "src/hooks/useUserContext";
import { v4 as uuid } from "uuid";
import SimpleInputForm from "./SimpleInputForm";
import AvatarImage from "./AvatarImage";
import { formatDate } from "src/utils/formatDate";

import { Delete } from "@mui/icons-material";
import { useUpdateChats, useUpdateUserChats } from "src/lib/react-query";
import { IMessageResponse } from "src/types";
import { useMessageContext } from "src/hooks/useMessageContext";
import NoChatMessages from "./NoChatMessages/NoChatMessages";
import NoChatMessagesBtn from "./NoChatMessages/NoChatMessagesBtn";

const ChatUI = ({ isDialog }: { isDialog: boolean }) => {
  const { t } = useTranslation();

  const [defaultInputValue, setDefaultInputValue] = useState("");

  const { data } = useChatContext();
  const { user: currentUser } = useUserContext();
  const { mutateAsync: updateUserChats } = useUpdateUserChats();
  const { mutateAsync: updateChats } = useUpdateChats();
  const { messages } = useMessageContext();

  const ref = useRef<Element>();

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
    <Box sx={{ p: 0.5 }}>
      {data.chatId !== "null" ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: isDialog ? "500px" : " calc(100vh - 176px)",
          }}
        >
          <Box
            sx={{
              gap: 2,
              p: isDialog ? 2 : { xs: 1, md: 2 },
              display: "flex",

              width: "100%",
              alignItems: "center",
              bgcolor: "background.paper",
            }}
          >
            <AvatarImage
              sx={{
                width: isDialog ? 50 : { xs: 65, md: 75 },
                height: isDialog ? 50 : { xs: 65, md: 75 },
              }}
              photoUrl={data.user.photoUrl}
              name={data.user.name}
              defaultCharacter={data.user.defaultCharacter}
            />
            <Typography variant="h2">{data.user.name}</Typography>
          </Box>
          <Box sx={{ flexGrow: 1, overflow: "auto" }} ref={ref}>
            {messages.length ? (
              <List sx={{ width: "100%" }}>
                {messages.map((message) => (
                  <ListItem
                    sx={{
                      width: "100%",
                    }}
                    key={message.id}
                  >
                    <Message message={message} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <NoChatMessages isDialog={isDialog} />
                <NoChatMessagesBtn
                  isDialog={isDialog}
                  setDefaultInputValue={setDefaultInputValue}
                  name={data.user.name}
                />
              </Box>
            )}
          </Box>
          <Box sx={{ p: 2 }}>
            <SimpleInputForm
              handleClick={handleSend}
              isComment={false}
              defaultValue={defaultInputValue}
            />
          </Box>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <NoChatMessages isDialog={isDialog} />

          <Typography variant="h2">{t("let's_write")}</Typography>
        </Box>
      )}
    </Box>
  );
};

export const Message = ({ message }: { message: IMessageResponse }) => {
  const { user } = useUserContext();
  const { data } = useChatContext();

  const isBot = message.senderId !== user.uid;
  const { mutateAsync: updateChats } = useUpdateChats();
  const [isVisible, setIsVisible] = useState(false);
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
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      sx={{
        mr: isBot ? "auto" : 0,
        ml: isBot ? 0 : "auto",
        width: "75%",
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          backgroundColor: isBot ? "primary.grey" : "secondary.light",
          color: "primary.white",

          position: "relative",
        }}
      >
        <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
          {message.text.value}
        </Typography>
        <Typography variant="body2">
          {formatDate(message?.date?.seconds)}
        </Typography>
        {isVisible ? (
          <Button
            sx={{
              position: "absolute",
              bottom: 0,

              right: isBot ? -50 : "auto",
              left: isBot ? "auto" : -50,

              color: "primary.accent",
            }}
            variant="text"
            onClick={handleDeleteMessage}
          >
            <Delete color="inherit" />
          </Button>
        ) : null}
      </Paper>
    </Box>
  );
};

export default ChatUI;
