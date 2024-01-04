import { useContext } from "react";
import { AuthContext } from "src/context/AuthContext";
import { IUserContext } from "src/types";

export const useUserContext = () => useContext<IUserContext>(AuthContext);
