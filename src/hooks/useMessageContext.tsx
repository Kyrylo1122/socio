import { useContext } from "react";
import {
  IMessagesContext,
  MessagesContext,
} from "src/context/MessagesContext/MessagesContext";

export const useMessageContext = () =>
  useContext<IMessagesContext>(MessagesContext);
