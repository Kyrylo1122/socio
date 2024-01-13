import { Box, List, ListItem } from "@mui/material";
import { useUserContext } from "src/hooks/useUserContext";

import UserChatItemMarkup from "src/Components/UserChatItemMarkup";

import ChatUI from "src/Components/ChatUI";

import { useGetUserMessages } from "src/lib/react-query";
import useSelectUserChat from "src/hooks/useSelectUserChat";
import { useEffect } from "react";
import useDialogContext from "src/hooks/useDialogContext";

const Chat = () => {
  const { user: currentUser } = useUserContext();
  const { data: msg } = useGetUserMessages(currentUser.uid);

  const { handleSelect } = useSelectUserChat();
  const { close, setIsInvisibleBtn, setIsVisibleBtn } = useDialogContext();

  useEffect(() => {
    setIsInvisibleBtn();
    close();
    return () => {
      setIsVisibleBtn();
    };
  }, []);

  if (!msg) return;
  const sortedMessages = Object.entries(msg)?.sort(
    (a, b) => b[1].date - a[1].date
  );
  console.log("sortedMessages: ", sortedMessages);
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
          position: "static",
          overflow: "hidden",
        }}
      >
        {sortedMessages ? (
          <List>
            {sortedMessages.map((chat) => (
              <ListItem
                key={chat[0]}
                onClick={async () => await handleSelect(chat[1].userInfo)}
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
          width: { md: "40%", lg: "48%", xl: "53%" },
          position: "fixed",
          right: 0,
          overflow: "hidden",
        }}
      >
        <ChatUI isDialog={false} />
      </Box>
    </Box>
  );
};

export default Chat;
