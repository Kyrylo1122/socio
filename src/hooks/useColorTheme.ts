import { createTheme, responsiveFontSizes } from "@mui/material";
import { useMemo, useState } from "react";
import { getDesignTokens } from "src/theme/theme";
import useLocaleStorageData from "./useLocaleStorageData";
import { ModeType } from "src/types";

const useColorTheme = () => {
  const { getThemeMode, setThemeMode } = useLocaleStorageData();
  const [mode, setMode] = useState<ModeType>(getThemeMode());
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    setThemeMode(mode === "light" ? "dark" : "light");
  };
  const modifiedTheme = useMemo(
    () => responsiveFontSizes(createTheme(getDesignTokens(mode))),
    [mode]
  );

  return { mode, toggleColorMode, theme: modifiedTheme };
};

export default useColorTheme;
