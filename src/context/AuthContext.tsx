import { createContext } from "react";
import { INITIAL_STATE } from "src/constant";

import { IUserContext } from "src/types";

export const AuthContext = createContext<IUserContext>(INITIAL_STATE);
