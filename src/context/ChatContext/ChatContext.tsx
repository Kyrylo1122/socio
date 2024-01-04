import { Dispatch, createContext } from "react";

import { IChatUserInfo } from "src/types";
import { CHAT_INITIAL_STATE } from "src/constant";

export interface IChatContext {
  data: { chatId: string; user: IChatUserInfo };
  dispatch: Dispatch<{ type: string; payload: IChatUserInfo }>;
}

export const ChatContext = createContext<IChatContext>(CHAT_INITIAL_STATE);
