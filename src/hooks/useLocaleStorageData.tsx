import { IUser, ModeType } from "src/types";

const useLocaleStorageData = () => {
  const getCurrentUser = () => {
    const currentUser = localStorage.getItem("currentUser");
    return currentUser ? JSON.parse(currentUser) : null;
  };

  const setCurrentUser = (value: IUser | null) => {
    if (!value) return localStorage.removeItem("currentUser");
    localStorage.setItem("currentUser", JSON.stringify(value));
  };
  const getThemeMode = () => {
    const themeMode = localStorage.getItem("themeMode") as ModeType;
    return themeMode ? themeMode : "light";
  };

  const setThemeMode = (value: ModeType) => {
    localStorage.setItem("themeMode", value);
  };

  return { getThemeMode, setThemeMode, getCurrentUser, setCurrentUser };
};

export default useLocaleStorageData;
