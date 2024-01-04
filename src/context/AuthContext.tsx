import { createContext } from "react";
import { USER_INITIAL } from "src/constant";

import { IUserContext } from "src/types";

export const AuthContext = createContext<IUserContext>({
  user: USER_INITIAL,
  friends: [],
  isLoading: false,
});
