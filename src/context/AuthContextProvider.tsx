import { ReactNode, useState, useEffect } from "react";
import { IUser } from "src/types";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "src/firebase/config";
import { getUserById } from "src/firebase/api-firebase";

interface IAuthContextProvider {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserAuth = () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          setIsLoading(true);
          const user = await getUserById(currentUser.uid);
          setIsLoading(false);

          if (!user) throw Error;
          setUser(user);
          navigate("/");
        } else {
          setUser(null);

          navigate("/sign-in");
        }
      });
    };
    setIsLoading(true);
    checkUserAuth();
    setIsLoading(false);
  }, []);

  const value = {
    user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};
