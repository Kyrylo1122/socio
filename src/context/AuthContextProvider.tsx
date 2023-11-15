import { ReactNode, useState, useEffect } from "react";
import { IUser } from "src/types";

import { useNavigate } from "react-router-dom";
import { getCurrentUserAccount } from "src/lib/api";
import { AuthContext } from "./AuthContext";
import { INITIAL_USER } from "src/constant";

interface IAuthContextProvider {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUserAccount();
      if (currentAccount) {
        const {
          $id: id,
          name,
          username,
          email,
          imageUrl,
          bio,
        } = currentAccount;
        setUser({ id, name, username, email, imageUrl, bio });
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error("checkAuthUser", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/sign-in");
    }

    checkAuthUser();
  }, []);
  //   useEffect(() => {
  //     navigate(`${isAuthenticated ? "/" : "/sign-in"}`);
  //   }, [isAuthenticated, navigate]);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};
