import { ReactNode, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { IMessageResponse } from "src/types";
import { useChatContext } from "src/hooks/useChatContext";
import { db } from "src/firebase/config";
import { MessagesContext } from "./MessagesContext";

export const MessagesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data } = useChatContext();
  const [messages, setMessages] = useState<IMessageResponse[]>([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  return (
    <MessagesContext.Provider value={{ messages }}>
      {children}
    </MessagesContext.Provider>
  );
};
