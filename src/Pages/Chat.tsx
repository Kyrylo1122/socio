import { Box } from "@mui/material";
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

const Chat = () => {
  const { user } = useUserContext();
  const currentUser = {
    uid: "lmkl",
    name: "Bob",
    photoUrl: null,
    defaultCharacter: 2,
  };
  const handleSelect = async () => {
    const combinedId = createCombinedId(currentUser.uid, user.uid);

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoUrl,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.name,
            photoURL: currentUser.photoUrl,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box>
      <UserChatItemMarkup
        name={user.name}
        photoUrl={user.photoUrl}
        defaultCharacter={user.defaultCharacter}
      />
      {/* <Messages />
      <Input /> */}
    </Box>
  );
};

export default Chat;
