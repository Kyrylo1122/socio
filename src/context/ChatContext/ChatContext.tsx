import { Dispatch, createContext } from "react";

import { IUserShortInfo } from "src/types";
import { CHAT_INITIAL_STATE } from "src/constant";

export interface IChatContext {
  data: { chatId: string; user: IUserShortInfo };
  dispatch: Dispatch<{ type: string; payload: IUserShortInfo }>;
}

export const ChatContext = createContext<IChatContext>(CHAT_INITIAL_STATE);
