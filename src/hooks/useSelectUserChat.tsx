import { IChatUserInfo } from "src/types";
import createCombinedId from "src/utils/createCombinedId";
import { useChatContext } from "./useChatContext";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "src/firebase/config";
import { useUserContext } from "./useUserContext";
import { useUpdateChats, useUpdateUserChats } from "src/lib/react-query";

const useSelectUserChat = () => {
  const { mutateAsync: updateUserChats } = useUpdateUserChats();
  const { mutateAsync: updateChats } = useUpdateChats();
  const { dispatch, data } = useChatContext();
  const { user: currentUser } = useUserContext();

  const handleSelect = async (user: IChatUserInfo) => {
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
                displayName: user.displayName,
                photoUrl: user.photoUrl,
                defaultCharacter: user.defaultCharacter,
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
                photoUrl: currentUser.photoUrl,
                defaultCharacter: currentUser.defaultCharacter,
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
  return { handleSelect };
};

export default useSelectUserChat;
