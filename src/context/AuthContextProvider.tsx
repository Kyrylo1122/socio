import { ReactNode, useState, useEffect, useCallback } from "react";
import { IUserResponse } from "src/types";

import { useNavigate } from "react-router-dom";
import { getCurrentUserAccount } from "src/lib/api";
import { AuthContext } from "./AuthContext";
import { INITIAL_USER } from "src/constant";
import { avatars } from "src/Components/ProfileAvatars/ProfilePictures";
import { useTranslation } from "react-i18next";

interface IAuthContextProvider {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const { t } = useTranslation();
  const [user, setUser] = useState<IUserResponse>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUserAccount();
      if (currentAccount) {
        const {
          $id,
          name,
          email,
          imageUrl,
          imageId,
          bio,
          defaultCharacter,
          backgroundImage,
          userInfo,
          password,
        } = currentAccount;
        setUser({
          $id,
          name,
          email,
          imageId,
          password,

          imageUrl: imageUrl ? imageUrl : avatars[defaultCharacter].image,
          bio: bio ? bio : t("default_bio"),
          defaultCharacter: defaultCharacter,
          backgroundImage,
          userInfo: userInfo ? userInfo : [],
        });
        setIsAuthenticated(true);
        navigate("/");

        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [navigate, t]);
  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      setIsAuthenticated(false);

      navigate("/sign-in");
    }

    checkAuthUser();
  }, [checkAuthUser, navigate]);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    setIsLoading,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};
