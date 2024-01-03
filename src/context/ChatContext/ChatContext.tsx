import { Dispatch, ReactNode, createContext, useReducer } from "react";
import createCombinedId from "src/utils/createCombinedId";
import { useUserContext } from "src/hooks/useUserContext";
import { IUser } from "src/types";

export interface IChatContext {
  data: { chatId: string };
  dispatch: Dispatch<{ type: string; payload: IUser }>;
}
export const ChatContext = createContext<IChatContext | null>(null);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext();
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action: { type: string; payload: IUser }) => {
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
