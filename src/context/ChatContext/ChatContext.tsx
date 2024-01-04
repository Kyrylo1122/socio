import { Dispatch, createContext } from "react";

import { IUser } from "src/types";
import { CHAT_INITIAL_STATE } from "src/constant";

export interface IChatContext {
  data: { chatId: string; user: IUser };
  dispatch: Dispatch<{ type: string; payload: IUser }>;
}

export const ChatContext = createContext<IChatContext>(CHAT_INITIAL_STATE);
