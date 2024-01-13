import { ReactNode, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "src/firebase/config";
import { useGetUsers, useGetUsersById } from "src/lib/react-query";
import { IUser } from "src/types";
import useLocaleStorageData from "src/hooks/useLocaleStorageData";

interface IAuthContextProvider {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const { getCurrentUser, setCurrentUser } = useLocaleStorageData();
  const currentUserLocalStorage = getCurrentUser();
  const [authUserId, setAuthUserId] = useState<string | null>(
    currentUserLocalStorage?.uid ?? null
  );
  const [user, setUser] = useState<IUser>(currentUserLocalStorage);

  const { data: currentUser, isPending: isLoading } =
    useGetUsersById(authUserId);
  const { data: friends } = useGetUsers(authUserId);

  useEffect(() => {
    if (!currentUser) return;
    setCurrentUser(currentUser);
    setUser(currentUser);
  }, [currentUser, setCurrentUser]);

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (currentUser.uid === currentUserLocalStorage?.uid) return;
        setAuthUserId(currentUser.uid);

        navigate("/");
      } else {
        setAuthUserId(null);
        setCurrentUser(null);

        navigate("/sign-in");
      }
    });

    return () => {
      unsub();
    };
  }, []);

  const value = {
    user,
    friends,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};
