import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AvatarImage from "./AvatarImage";
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

const ChatUI = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there!", sender: "bot" },
    { id: 2, text: "Hello!", sender: "user" },
    { id: 3, text: "How can I assist you today?", sender: "bot" },
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
      <Box sx={{ width: "100%", backgroundColor: "brown", p: 3 }}>AVATAR</Box>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Box>
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <SimpleInputForm handleClick={handleSend} isComment={false} />
        {/* <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              placeholder="Type a message"
              value={text}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              size="large"
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSend}
            >
              Send
            </Button>
          </Grid>
        </Grid> */}
      </Box>
    </Box>
  );
};

const Message = ({ message }) => {
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
        {/* <Typography variant="body2">{message.date}</Typography> */}
      </Paper>
    </Box>
  );
};

export default ChatUI;
