import { useContext } from "react";
import { ChatContext } from "src/context/ChatContext/ChatContext";

export const useChatContext = () => useContext(ChatContext);
