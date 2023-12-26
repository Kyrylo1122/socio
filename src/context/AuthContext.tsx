import { createContext } from "react";

import { IUserContext } from "src/types";

export const AuthContext = createContext<IUserContext | any>(null);
