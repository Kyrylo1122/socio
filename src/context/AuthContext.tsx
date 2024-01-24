import { createContext } from "react";
import { CURRENT_USER_INITIAL } from "src/constant";

import { IUserContext } from "src/types";

export const AuthContext = createContext<IUserContext>({
  user: CURRENT_USER_INITIAL,
  friends: [],
  isLoading: false,
  setUser: () => {},
});
