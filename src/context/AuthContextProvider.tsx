import { ReactNode, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "src/firebase/config";

interface IAuthContextProvider {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        navigate("/");
      } else {
        setUser(null);

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
