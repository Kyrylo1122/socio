import { Box, List, ListItem } from "@mui/material";
import { useUserContext } from "src/hooks/useUserContext";

import UserChatItemMarkup from "src/Components/UserChatItemMarkup";

import ChatUI from "src/Components/ChatUI";

import { useGetUserMessages } from "src/lib/react-query";
import useSelectUserChat from "src/hooks/useSelectUserChat";
import { useEffect, useState } from "react";

const Chat = () => {
  const { user: currentUser } = useUserContext();
  const { data: msg } = useGetUserMessages(currentUser.uid);
  const [lastMsg, setLastMsg] = useState();

  const { handleSelect } = useSelectUserChat();

  if (!msg) return;
  const sortedMessages = Object.entries(msg)?.sort(
    (a, b) => b[1].date - a[1].date
  );
  return (
    <Box
      sx={{
        display: "flex",
        w: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <List>
          {sortedMessages.map((chat, index) => {
            if (index === sortedMessages.length - 1) {
              console.log(chat);
            }
            return (
              <ListItem
                key={chat[0]}
                onClick={async () => await handleSelect(chat[1].userInfo)}
              >
                <UserChatItemMarkup
                  name={chat[1].userInfo.displayName}
                  photoUrl={chat[1].userInfo.photoUrl}
                  lastMessage={chat[1]?.lastMessage?.text?.value}
                  lastMessageDate={chat[1]?.date?.seconds * 1000}
                  defaultCharacter={chat[1]?.userInfo?.defaultCharacter}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box
        sx={{
          width: { md: "40%", lg: "50%", xl: "55%" },
          position: "fixed",
          right: 0,
          overflow: "hidden",
        }}
      >
        <ChatUI />
      </Box>
    </Box>
  );
};

export default Chat;
