import { ReactNode, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "src/firebase/config";
import { useGetUsersById } from "src/lib/react-query";
import { IUser } from "src/types";

interface IAuthContextProvider {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const { data: currentUser, isPending: isLoading } =
    useGetUsersById(authUserId);

  useEffect(() => {
    console.log("changed currentUser");

    if (!currentUser) return;
    setUser(currentUser);
  }, [currentUser]);

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setAuthUserId(currentUser.uid);

        navigate("/");
      } else {
        setAuthUserId(null);

        navigate("/sign-in");
      }
    });

    return () => {
      unsub();
    };
  }, []);

  const value = {
    user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};
