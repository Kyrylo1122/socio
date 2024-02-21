import { Box, List, ListItem } from "@mui/material";
import { useUserContext } from "src/hooks/useUserContext";

import UserChatItemMarkup from "src/Components/Chat/UserChatItemMarkup";

import ChatUI from "src/Components/Chat/ChatUI";

import { useGetUserMessages } from "src/lib/react-query";
import useSelectUserChat from "src/hooks/useSelectUserChat";
import { useEffect, useLayoutEffect } from "react";
import useDialogContext from "src/hooks/useDialogContext";
import { IUserShortInfo } from "src/types";

const Chat = () => {
  const { user: currentUser } = useUserContext();
  const { data: msg } = useGetUserMessages(currentUser.uid);
  const { handleSelect } = useSelectUserChat();
  const { isOpen, open, close, setIsInvisibleBtn, setIsVisibleBtn } =
    useDialogContext();

  useEffect(() => {
    setIsInvisibleBtn();
    return () => {
      setIsVisibleBtn();
    };
  }, []);
  useLayoutEffect(() => {
    if (window.innerWidth > 600) close();
  }, [close]);

  const handleClick = async (chat: IUserShortInfo) => {
    if (!isOpen) open();
    await handleSelect(chat);
  };
  if (!msg) return;
  const sortedMessages = Object.entries(msg)?.sort(
    (a, b) => b[1].date - a[1].date
  );
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "auto",
          flex: 1,
        }}
      >
        {sortedMessages ? (
          <List sx={{ position: "absolute", width: "100%" }}>
            {sortedMessages.map((chat) => (
              <ListItem
                sx={{ m: "8px 0", p: 0 }}
                key={chat[0]}
                onClick={() => handleClick(chat[1].userInfo)}
              >
                <UserChatItemMarkup
                  name={chat[1].userInfo.name}
                  photoUrl={chat[1]?.userInfo.photoUrl}
                  lastMessage={chat[1]?.lastMessage?.text?.value}
                  lastMessageDate={chat[1]?.date?.seconds * 1000}
                  defaultCharacter={chat[1]?.userInfo?.defaultCharacter}
                />
              </ListItem>
            ))}
          </List>
        ) : null}
      </Box>
      <Box
        sx={{
          position: "relative",
          flex: 2,

          overflow: "hidden",

          display: { xs: "none", sm: "flex" },
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100% " }}>
          <ChatUI isDialog={false} />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
