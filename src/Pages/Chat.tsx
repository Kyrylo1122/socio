import { Box, List, ListItem } from "@mui/material";
import { useUserContext } from "src/hooks/useUserContext";

import UserChatItemMarkup from "src/Components/UserChatItemMarkup";
import createCombinedId from "src/utils/createCombinedId";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "src/firebase/config";
import ChatUI from "src/Components/ChatUI";
import Spinner from "src/Components/Spinner";
import { useChatContext } from "src/hooks/useChatContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "src/types";
import { useGetUserMessages } from "src/lib/react-query";

const Chat = () => {
  //   const { user, friends } = useUserContext();
  const userContext = useUserContext();
  const { user } = userContext;
  const { data: msg, isPending } = useGetUserMessages(user.uid);
  console.log("msg: ", msg);

  const { dispatch } = useChatContext();

  const handleSelect = async (user: IUser) => {
    if (!userContext) return;
    const { user: currentUser } = userContext;
    const combinedId = createCombinedId(currentUser.uid, user.uid);
    dispatch({ type: "CHANGE_USER", payload: user });

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection

        //create user chats
        await setDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId]: {
            userInfo: {
              uid: user.uid,
              displayName: user.name,
              photoURL: user.photoUrl,
            },
            date: serverTimestamp(),
          },
        });

        await setDoc(doc(db, "userChats", user.uid), {
          [combinedId]: {
            userInfo: {
              uid: currentUser.uid,
              displayName: currentUser.name,
              photoURL: currentUser.photoUrl,
            },
            date: serverTimestamp(),
          },
        });
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!userContext) return <Spinner />;
  if (!msg) return;
  const { friends } = userContext;
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
            .map((chat) => {
              console.log("chat: ", chat);
              return (
                <ListItem
                  key={chat[0]}
                  //   onClick={() => handleSelect(friend)}
                >
                  <UserChatItemMarkup
                    name={chat[1].userInfo.displayName}
                    photoUrl={chat[1].userInfo.photoUrl}
                    lastMessage={chat[1].lastMessage.text.value}
                    defaultCharacter={2}
                  />
                </ListItem>
              );
            })}
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
