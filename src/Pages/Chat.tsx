import { Box, List, ListItem } from "@mui/material";
import { useUserContext } from "src/hooks/useUserContext";

import UserChatItemMarkup from "src/Components/UserChatItemMarkup";
import createCombinedId from "src/utils/createCombinedId";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "src/firebase/config";
import ChatUI from "src/Components/ChatUI";
import Spinner from "src/Components/Spinner";
import { useChatContext } from "src/hooks/useChatContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "src/types";

const Chat = () => {
  //   const { user, friends } = useUserContext();
  const userContext = useUserContext();
  const navigate = useNavigate();

  const chatContext = useChatContext();
  useEffect(() => {
    if (!userContext?.friends) navigate("/");
  }, [navigate, userContext]);

  const handleSelect = async (user: IUser) => {
    if (!chatContext || !userContext) return;
    const { user: currentUser } = userContext;
    const { dispatch } = chatContext;
    const combinedId = createCombinedId(currentUser.uid, user.uid);
    dispatch({ type: "CHANGE_USER", payload: user });

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await setDoc(
          doc(db, "userChats", currentUser.uid),
          {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.name,
              photoURL: user.photoUrl,
            },
            [combinedId + ".date"]: serverTimestamp(),
          },
          { merge: true }
        );

        await setDoc(
          doc(db, "userChats", user.uid),
          {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.name,
              photoURL: currentUser.photoUrl,
            },
            [combinedId + ".date"]: serverTimestamp(),
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (!userContext) return <Spinner />;
  const { friends } = userContext;
  return (
    <Box sx={{ display: "flex", w: "100%" }}>
      <Box sx={{ flex: 1, outline: "1px solid brown" }}>
        <List>
          {friends.map((friend) => (
            <ListItem key={friend.uid} onClick={() => handleSelect(friend)}>
              <UserChatItemMarkup
                name={friend.name}
                photoUrl={friend.photoUrl}
                defaultCharacter={friend.defaultCharacter}
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
