import { ThemeOptions, createTheme } from "@mui/material";
import { FC, PropsWithChildren, createContext, useContext } from "react";
import useColorTheme from "./useColorTheme";
import { ModeType } from "src/types";

interface ICreateContext {
  mode: ModeType;
  toggleColorMode: () => void;
  theme: ThemeOptions | undefined;
}

const ThemeContext = createContext<ICreateContext>({
  mode: "light",
  toggleColorMode: () => {},
  theme: createTheme(),
});

const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useColorTheme();
  return (
    <ThemeContext.Provider value={value}>{children} </ThemeContext.Provider>
  );
};

export default useThemeContext;
