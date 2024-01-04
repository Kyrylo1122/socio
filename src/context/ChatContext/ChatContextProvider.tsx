import { ReactNode, useReducer } from "react";

import createCombinedId from "src/utils/createCombinedId";
import { useUserContext } from "src/hooks/useUserContext";
import { IUser } from "src/types";
import { ChatContext } from "./ChatContext";
import { USER_INITIAL } from "src/constant";
export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext();
  const INITIAL_STATE = {
    chatId: "null",
    user: USER_INITIAL,
  };

  const chatReducer = (
    state: { chatId: string; user: IUser },
    action: { type: string; payload: IUser }
  ) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId: createCombinedId(user.uid, action.payload.uid),
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
