import { Box, List, ListItem } from "@mui/material";
import { useUserContext } from "src/hooks/useUserContext";

import UserChatItemMarkup from "src/Components/UserChatItemMarkup";
import createCombinedId from "src/utils/createCombinedId";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "src/firebase/config";
import ChatUI from "src/Components/ChatUI";
import { useChatContext } from "src/hooks/useChatContext";

import { IUser } from "src/types";
import {
  useGetUserMessages,
  useUpdateChats,
  useUpdateUserChats,
} from "src/lib/react-query";

const Chat = () => {
  const { user: currentUser } = useUserContext();
  const { data } = useChatContext();
  const { mutateAsync: updateUserChats } = useUpdateUserChats();
  const { mutateAsync: updateChats } = useUpdateChats();

  const { data: msg } = useGetUserMessages(currentUser.uid);
  console.log("msg: ", msg);

  const { dispatch } = useChatContext();

  const handleSelect = async (user: IUser) => {
    const combinedId = createCombinedId(currentUser.uid, user.uid);
    if (data.chatId === combinedId) return console.log("Same chat");
    dispatch({ type: "CHANGE_USER", payload: user });

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection

        //create user chats
        await updateUserChats({
          id: currentUser.uid,
          data: {
            [combinedId]: {
              userInfo: {
                uid: user.uid,
                displayName: user.name,
                photoURL: user.photoUrl,
              },
              date: serverTimestamp(),
            },
          },
        });
        await updateUserChats({
          id: user.uid,
          data: {
            [combinedId]: {
              userInfo: {
                uid: currentUser.uid,
                displayName: currentUser.name,
                photoURL: currentUser.photoUrl,
              },
              date: serverTimestamp(),
            },
          },
        });
        await updateChats({
          id: combinedId,
          data: {
            messages: [],
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!msg) return;
  return (
    <Box sx={{ display: "flex", w: "100%" }}>
      <Box sx={{ flex: 1, outline: "1px solid brown" }}>
        <List>
          {/* {friends.map((friend) => (
            <ListItem key={friend.uid} onClick={() => handleSelect(friend)}>
              <UserChatItemMarkup
                name={friend.name}
                photoUrl={friend.photoUrl}
                defaultCharacter={friend.defaultCharacter}
              />
            </ListItem>
          ))} */}
          {Object.entries(msg)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <ListItem
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}
              >
                <UserChatItemMarkup
                  name={chat[1].userInfo.displayName}
                  photoUrl={chat[1].userInfo.photoUrl}
                  lastMessage={chat[1].lastMessage.text.value}
                  defaultCharacter={2}
                />
              </ListItem>
            ))}
        </List>
      </Box>
      <Box sx={{ flex: 2, outline: "1px solid blue" }}>
        <ChatUI />
      </Box>

      {/* <Messages />
      <Input /> */}
    </Box>
  );
};

export default Chat;
