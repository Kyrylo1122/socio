import { useContext } from "react";
import { ChatContext, IChatContext } from "src/context/ChatContext/ChatContext";

export const useChatContext = () => useContext<IChatContext>(ChatContext);
