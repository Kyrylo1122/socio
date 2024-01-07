import { createContext } from "react";

import { IMessageResponse } from "src/types";

export interface IMessagesContext {
  messages: IMessageResponse[];
}

export const MessagesContext = createContext<IMessagesContext>({
  messages: [],
});
